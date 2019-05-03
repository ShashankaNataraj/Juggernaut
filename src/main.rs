extern crate web_view;

use web_view::*;
use std::fs;

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
                    println!("{}",file_content);
                    let string1 = r#"Hello, world!"#;
                    let mut formattedString = &format!("file_operation(\"{}\")",string1);
                    println!("{}",formattedString);
                    webview.eval(formattedString);
                },
                _ => unimplemented!()
            };
            Ok(())
        })
        .run()
        .unwrap();
}