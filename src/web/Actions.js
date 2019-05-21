import Templates from "./TemplateMapping";
import Swal from "sweetalert2";
import * as $ from "jquery";
import RPC from "./RPC";

let currentlyOpenedFilePath;

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
							path = targetNode.data('folder-path') + "/";
						RPC.listFiles({path, cb: "selectProjectRoot"});
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
		console.log('listed files');
		const html = Templates.getTemplate('find-files-dialog', {
			filesAndFolders
		});
		Swal.fire({
			html,
			showConfirmButton: false,
			onOpen: () => {
				$('.file-and-folder-listing > .entry')
					.on('click', (evt) => {
						const target = $(evt.currentTarget);
						RPC.readFile(target.data('path'));
						Swal.close();
					})
			}
		});
	}

	static writeFile(action, editor) {
		RPC.writeFile({
			file: currentlyOpenedFilePath,
			contents: editor.getValue()
		});
	}

	static loadFile(editor, content, path){
		currentlyOpenedFilePath = path;
		const modeToFileMapping = {
			'js': 'ace/mode/javascript',
			'html': 'ace/mode/html',
			'hbs': 'ace/mode/handlebars',
			'md': 'ace/mode/markdown',
			'toml': 'ace/mode/toml',
			'json': 'ace/mode/json',
			'scss': 'ace/mode/scss'
		};
		let pathSplit = path.split('.');
		let extension = pathSplit[pathSplit.length - 1];
		let mode = modeToFileMapping[extension];
		editor.setValue(content);
		editor.session.setMode(mode);
		console.log(mode);
		editor.gotoLine(0);
	}
}