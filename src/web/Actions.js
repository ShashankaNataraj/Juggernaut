import Templates from "./TemplateMapping";
import Swal from "sweetalert2";
import * as $ from "jquery";
import RPC from "./RPC";

export default class Actions {
	static selectProjectRoot(cfg, folders, currentPath){
		const html = Templates.getTemplate('set-project-root', {
			folders
		});
		Swal.fire({
			html,
			showConfirmButton: false,
			onOpen: () => {
				$('.search-by-folder-name')
					.on('keyup', (evt) => {
						console.log(evt.currentTarget.value);
					});
				$('.folder-list > .folder-name')
					.on('click', (evt) => {
						const targetNode = $(evt.currentTarget),
							folderName = targetNode.data('folder-name'),
							path = targetNode.data('folder-path') + "/*";
						RPC.listFiles({path, cb: "selectProjectRoot"})
					});
				$('.set-project-root > .btn-set-as-root')
					.on('click', (evt) => {
						cfg.onSelectRoot(currentPath);
						Swal.close();
					})
			},
			onClose: () => {

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