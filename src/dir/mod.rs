mod utils;
use utils::get_dir_name_from_path;
use std::fs::metadata;
use ignore::Walk;
use std::fs;

#[derive(Serialize)]
pub struct DiskEntry {
    path: String,
    is_dir: bool,
    name: String,
}

fn is_dir(file_name:String) -> bool{
    let md = metadata(file_name.to_string()).unwrap();
    return md.is_dir();
}

pub fn walk_dir(path_copy:String) -> String{
    println!("Trying to walk: {}", path_copy.as_str());
    let mut files_and_dirs: Vec<DiskEntry> = vec![];
    for result in Walk::new(path_copy) {
        // Each item yielded by the iterator is either a directory entry or an
        // error, so either print the path or the error.
        match result {
            Ok(entry) => {
                
               let display_value = entry.path().display();
               let dir_name = display_value.to_string();
                files_and_dirs.push(DiskEntry {
                    path: display_value.to_string(),
                    is_dir: is_dir(display_value.to_string()),
                    name: display_value.to_string()
                });
            }
            Err(err) => println!("ERROR: {}", err),
        }
    }
    return serde_json::to_string(&files_and_dirs).unwrap();
}

pub fn list_dir_contents(dir_path:&String) -> String{
    let mut dirs: Vec<DiskEntry> = vec![];
    let paths = fs::read_dir(dir_path).unwrap();
    for path in paths {
        let dir_path = path.unwrap().path();
        let dir_name = dir_path.display();
        dirs.push(DiskEntry {
            path: format!("{}",dir_name),
            is_dir: true,
            name: get_dir_name_from_path(dir_name.to_string())
        });
    }
    return serde_json::to_string(&dirs).unwrap();
}