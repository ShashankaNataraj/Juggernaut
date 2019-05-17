import * as $ from 'jquery';
import Swal from 'sweetalert2';

import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import Constants from "./Constants";
import ChordsObserver from "./ChordsObserver";
import * as List from "list.js";
import "./styles/styles.scss";
import Actions from "./Actions";

$(() => {
	console.log(List);
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
			if (action === "save-current-file") {
				RPC.writeFile({
					file: '/Users/shasn/Code/Juggernaut/dist/index.html',
					contents: editor.getValue()
				});
			} else if (action === "set-project-root") {
				RPC.listFiles({path: "/Users/shasn/Code/*", cb: "setProjectRoot"})
			} else if (action === 'open-project-folder') {
				RPC.listFiles({path: "/Users/shasn/Code/**/Bl*", cb: "listFiles"})
			}
		}
	});

	const actionScope = {editor};
	window.listFiles = Actions.listFiles.bind(actionScope);
	window.setProjectRoot = Actions.setProjectRoot.bind(actionScope);
	window.load_file = Actions.loadFile.bind(actionScope, editor);

	RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");
});