#[macro_use]
use std::fs::File;
use std::io::Write;
use std::io::Read;
extern crate serde_json;
pub fn read_file(file:String) -> String{
    let path = file.clone();
    let mut file = File::open(file)
        .expect("Unable to open the file");
    let mut contents = String::new();
    file.read_to_string(&mut contents)
        .expect("Unable to read the file");
    return serde_json::to_string(&contents).unwrap().to_string();
}
