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
		editor.addAction({
			// An unique identifier of the contributed action.
			id: 'my-unique-id',

			// A label of the action that will be presented to the user.
			label: 'My Label!!!',

			// An optional array of keybindings for the action.
			keybindings: [
				monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
				// chord
				monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M)
			],

			// A precondition for this action.
			precondition: null,

			// A rule to evaluate on top of the precondition in order to dispatch the keybindings.
			keybindingContext: null,

			contextMenuGroupId: 'navigation',

			contextMenuOrder: 1.5,

			// Method that will be executed when the action is triggered.
			// @param editor The editor instance is passed in as a convinience
			run: function(ed) {
				alert("i'm running => " + ed.getPosition());
				return null;
			}
		});
		const statusNode = document.getElementById('status'),
			vimMode = MonacoVim.initVimMode(editor, statusNode);
	};
});