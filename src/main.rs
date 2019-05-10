extern crate web_view;

use web_view::*;
use std::fs;
use std::io::prelude::*;
use std::fs::File;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
    Init,
    Read { file: String },
    Write{ file: String, contents:String}
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
                },
                Write {file, contents} => {

                }
                _ => unimplemented!()
            }
            Ok(())
        })
        .run()
        .unwrap();
}
