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
use dir::*;

mod dir;
mod file;
mod rpc;
mod cmd;

fn main() {
    dir::create_home_config();
    web_view::builder()
        .title("Juggernaut")
        .content(Content::Html(include_str!("../dist/index.html")))
        .size(2068, 1024) // TODO:Resolution is fixed right now, change this later to be dynamic
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, arg| {
            use cmd::Cmd::*;
            match serde_json::from_str(arg).unwrap() {
                Init => (),
                Read { file } => {
                    let path = file.clone();
                    let contents = file::read_file(file);
                    let cb = "load_file".to_string();
                    let formatted_string = rpc::format_callback(cb, contents, path);
                    _webview.eval(&formatted_string);
                }
                Write { file, contents } => {
                    let mut f = File::create(file).unwrap();
                    f.write_all(contents.as_bytes());
                }
                ListDirs{cb, home, path} => {
                    let mut json_dir_listing:String;
                    dir::list_home_dir_contents();
                    if home == true {
                        println!("Listing Home!");
                        json_dir_listing = dir::list_home_dir_contents();
                    } else {
                        println!("Listing {}", path);
                        json_dir_listing = dir::list_dir_contents(&path);
                    }
                    let eval_string = rpc::format_callback(cb, json_dir_listing, path);
                    _webview.eval(eval_string.as_str());
                }
                List { path, cb } => {
                    let path_copy = &path.clone();
                    let listing_json = dir::walk_dir(path_copy.to_string());
                    let formatted_string = rpc::format_callback(cb, listing_json, path_copy.to_string());
                    _webview.eval(formatted_string.as_str());
                },
                SetHome{path, cb} => {
//                    dir::set_home_dir();
//                    let formatted_string = rpc::format_callback(cb, "".to_string(), "".to_string());
                }
            }
            Ok(())
        })
        .run()
        .unwrap();
}