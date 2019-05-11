import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import * as monaco from 'monaco-editor';
import * as MonacoVim from 'monaco-vim';


window.addEventListener('DOMContentLoaded',function() {


	// let editor = ace.edit(document.querySelector('#editor'), {
	// 	mode: "ace/mode/html",
	// 	showPrintMargin:false,
	// 	theme:"ace/theme/gruvbox",
	// 	keyboardHandler:"ace/keyboard/vim",
	// 	behavioursEnabled:true
	// });
	// Keys.bindShortcuts(editor, {
	// 	'find-files-dialog':function(editor){
	// 		Swal.fire({
	// 			html:Templates.getTemplate('find-files-dialog',{}),
	// 			showConfirmButton:false
	// 		});
	// 	}
	// })
	RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");
	
	window.load_file = function (content){
		const editor = monaco.editor.create(document.getElementById("editor"), {
			value: content,
			language: "javascript"
		});	
		const statusNode = document.getElementById('status'),
			vimMode = MonacoVim.initVimMode(editor, statusNode);
	};
});