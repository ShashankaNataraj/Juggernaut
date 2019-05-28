#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate glob;
extern crate web_view;
extern crate dirs;
use web_view::*;
use std::io::prelude::*;
use std::fs::File;
use std::io::Write;
use glob::glob;

mod dir;
mod file;

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
    Init,
    Read { file: String },
    Write { file: String, contents: String },
    List { path: String, cb: String},
    ListDirs { cb: String, home:bool, path:String },
}

fn format_rpc_callback(cb:String, listing_json:String, path:String) -> String{
    let formatted_string = &format!("{}({},'{}')", cb, listing_json, path.clone());
    return formatted_string.to_string();
}

fn main() {
    web_view::builder()
        .title("Juggernaut")
        .content(Content::Html(include_str!("../dist/index.html")))
        .size(2068, 1024) // Resolution is fixed right now, change this later to be dynamic
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, arg| {
            use Cmd::*;
            match serde_json::from_str(arg).unwrap() {
                Init => (),
                Read { file } => {
                    let path = file.clone();
                    let contents = file::read_file(file);
                    let cb = "load_file".to_string();
                    let formatted_string = format_rpc_callback(cb, contents, path);
                    _webview.eval(&formatted_string);
                }
                Write { file, contents } => {
                    let mut f = File::create(file).unwrap();
                    f.write_all(contents.as_bytes());
                }
                ListDirs{cb, home, path} => {
                    if home == true {
                        println!("Listing Home!");
                        let mut path_buf_home_dir = dirs::home_dir();
                        let path_buf_home_dir = path_buf_home_dir.unwrap();
                        let default_dir_path = format!("{}/",path_buf_home_dir.to_str().unwrap());
                        let json_dir_listing:String = dir::list_dir_contents(&default_dir_path);
                        let eval_string = format_rpc_callback(cb, json_dir_listing, default_dir_path);
                        _webview.eval(eval_string.as_str());
                    } else {
                        println!("Listing {}", path);
                        let dir_path = format!("{}",path);
                        let json_dir_listing:String = dir::list_dir_contents(&dir_path);
                        let eval_string = format_rpc_callback(cb, json_dir_listing, dir_path);
                        _webview.eval(eval_string.as_str());
                    }
                }
                List { path, cb } => {
                    let path_copy = &path.clone();
                    let listing_json = dir::walk_dir(path_copy.to_string());
                    let formatted_string = format_rpc_callback(cb, listing_json, path_copy.to_string());
                    _webview.eval(formatted_string.as_str());
                }
            }
            Ok(())
        })
        .run()
        .unwrap();
}