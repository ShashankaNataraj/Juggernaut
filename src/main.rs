#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate glob;
extern crate web_view;

//extern crate ripgrep;
use ignore::Walk;

use std::fs::metadata;


use web_view::*;
use std::io::prelude::*;
use std::fs::File;
use std::io::Write;
use glob::glob;

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
    Init,
    Read { file: String },
    Write { file: String, contents: String },
    List { path: String, cb: String },
}

#[derive(Serialize)]
pub struct DiskEntry {
    path: String,
    is_dir: bool,
    name: String,
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
                    let mut file = File::open(file)
                        .expect("Unable to open the file");
                    let mut contents = String::new();
                    file.read_to_string(&mut contents)
                        .expect("Unable to read the file");

                    let formatted_string = &format!("load_file({},'{}')",
                                                    serde_json::to_string(&contents).unwrap(),
                                                    path
                    );
                    _webview.eval(formatted_string);
                }
                Write { file, contents } => {
                    let mut f = File::create(file).unwrap(); // Panics (see the docs) if create failed.
                    f.write_all(contents.as_bytes());
                }
                List { path, cb } => {
                    println!("Path received:{}", path);
                    let path_copy = &path.clone();
                    let mut files_and_dirs: Vec<DiskEntry> = vec![];
                    for result in Walk::new(path_copy) {
                        // Each item yielded by the iterator is either a directory entry or an
                        // error, so either print the path or the error.
                        match result {
                            Ok(entry) => {
                                let display_value = entry.path().display();
                                let md = metadata(display_value.to_string()).unwrap();
                                let path = display_value.to_string();
                                let path_collect: Vec<&str> = path.split("/").collect();
                                files_and_dirs.push(DiskEntry {
                                    path: display_value.to_string(),
                                    is_dir: md.is_dir(),
                                    name: path_collect[path_collect.len() - 1].to_string(),
                                });
                            }
                            Err(err) => println!("ERROR: {}", err),
                        }
                    }
                    let listing_json = serde_json::to_string(&files_and_dirs).unwrap();
                    let formatted_string = &format!("{}({},'{}')", cb, listing_json, path_copy.clone());
                    println!("{}",formatted_string);
                    _webview.eval(formatted_string);
                }
            }
            Ok(())
        })
        .run()
        .unwrap();
}