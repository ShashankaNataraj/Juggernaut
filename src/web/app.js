import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import Constants from "./Constants";
import ChordsObserver from "./ChordsObserver";

$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html",
		showPrintMargin: false,
		theme: "ace/theme/gruvbox",
		keyboardHandler: "ace/keyboard/vim",
		behavioursEnabled: true
	});
	ChordsObserver.init({
		editor,
		userKeyChords: { // TODO: At some point in future, accept user config
			hwm: 'hello-world-message'
		},
		onChordComplete: (action) => {
			console.log(`action:${action}`);
			if (action === "save-current-file") {
				RPC.writeFile({
					file: '/Users/shasn/Code/Juggernaut/dist/index.html',
					contents: editor.getValue()
				});
			}else if (action === 'open-project-folder'){
				RPC.listFiles({path:"/Users/shasn/Code/*"})
			}
		}
	});
	RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");

	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
	window.listFiles = function(content){
		console.log(content);

	}
});