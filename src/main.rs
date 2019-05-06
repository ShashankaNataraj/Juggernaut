extern crate web_view;

use web_view::*;
use std::fs;
use serde_json;
use std::fs::File;
use std::io::Write;

fn main() {
    web_view::builder()
        .title("Juggernaut Editor")
        .content(Content::Html(include_str!("../dist/index.html")))
        .size(800, 600)
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            match arg {
                "read" => {
                    let file_content = include_str!("../dist/index.html");
                    let mut formatted_string = &format!("load_file({})",serde_json::to_string(file_content).unwrap());
                    webview.eval(formatted_string);
                },
                "write" => {

//                    let mut file = File::create("hello_world.txt")
//                        .expect("unable to create file");
//                    serde_json::to_string(file_content).unwrap();
//                    file.write_all(output.as_bytes()).expect("unable to write");

                }
                _ => unimplemented!()
            };
            Ok(())
        })
        .run()
        .unwrap();
}
