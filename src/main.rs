#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate glob;
extern crate web_view;

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
    List { path: String },
}

#[derive(Serialize)]
pub struct DiskEntry {
    path: String,
    is_dir: bool,
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
                    let mut file = File::open(file)
                        .expect("Unable to open the file");
                    let mut contents = String::new();
                    file.read_to_string(&mut contents)
                        .expect("Unable to read the file");

                    let formatted_string = &format!("load_file({})",
                                                    serde_json::to_string(&contents).unwrap()
                    );
                    _webview.eval(formatted_string);
                }
                Write { file, contents } => {
                    let mut f = File::create(file).unwrap(); // Panics (see the docs) if create failed.
                    f.write_all(contents.as_bytes());
                }
                List { path } => {
                    let mut files_and_dirs: Vec<DiskEntry> = vec![];
                    for entry in glob(&path.to_string()).expect("Failed to read glob pattern") {
                        let entity_name = entry.unwrap();
                        let display_value = entity_name.display();
                        let path = entry.path();
                        let md = metadata(display_value.to_string()).unwrap();
                        files_and_dirs.push(DiskEntry {
                            path: display_value.to_string(),
                            is_dir: md.is_dir()
                        });
                    }
                    let listing_json = serde_json::to_string(&files_and_dirs).unwrap();
                    let formatted_string = &format!("listFiles({})", listing_json);
                    _webview.eval(formatted_string);
                }
            }
            Ok(())
        })
        .run()
        .unwrap();
}
