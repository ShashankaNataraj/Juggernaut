import Templates from "./TemplateMapping";
import Swal from "sweetalert2";
import * as $ from "jquery";

export default class Actions {
	static setProjectRoot(folders){
		const html = Templates.getTemplate('set-project-root', {
			folders
		});
		Swal.fire({
			html,
			showConfirmButton: false,
			onOpen: function (){
				$('.search-by-folder-name')
					.on('keydown', () => {
						console.log(1);
					})
			}
		})
	}

	static listFiles(filesAndFolders){
		const html = Templates.getTemplate('find-files-dialog', {
			filesAndFolders
		});
		Swal.fire({
			html,
			showConfirmButton: false
		});
	}

	static loadFile(editor, content){
		editor.setValue(content);
		editor.gotoLine(0);
	}
}