extern crate web_view;

use web_view::*;
use std::fs;
use serde_json;

fn main() {
    web_view::builder()
        .title("Juggernaut Editor")
        .content(Content::Html(include_str!("web/index.html")))
        .size(800, 600)
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            match arg {
                "read" => {
                    let file_content = include_str!("web/index.html");
                    let mut formattedString = &format!("load_file({})",serde_json::to_string(file_content).unwrap());
                    webview.eval(formattedString);
                },
                _ => unimplemented!()
            };
            Ok(())
        })
        .run()
        .unwrap();
}