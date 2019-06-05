import * as $ from 'jquery';

import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import Constants from "./Constants";
import ChordsObserver from "./ChordsObserver";
import * as List from "list.js";
import "./styles/styles.scss";
import Actions from "./Actions";

$(() => {
	RPC.getUserConfig({
		cb:"parse_user_config"
	});
	console.log(List);
	let editor = ace.edit(document.querySelector('#editor'), {
		showPrintMargin: false,
		theme: "ace/theme/gruvbox",
		keyboardHandler: "ace/keyboard/vim",
		behavioursEnabled: true
	}), projectRoot = '~/';
	ChordsObserver.init({
		editor,
		userKeyChords: { // TODO: At some point in future, accept user config
			hwm: 'hello-world-message'
		},
		onChordComplete: (action) => {
			if (action === "save-current-file") {
				Actions.writeFile(action, editor);
			} else if (action === "set-project-root") {
				RPC.listDirs({cb: "selectProjectRoot", home:true});
			} else if (action === 'open-project-file') {
				let commandObj = {path: `${projectRoot}`, cb: "listFiles"};
				RPC.listFiles({path: `${projectRoot}`, cb: "listFiles"});
			}
		}
	});

	const actionScope = {editor};
	window.listFiles = Actions.listFiles.bind(actionScope);
	window.selectProjectRoot = Actions.selectProjectRoot.bind(actionScope, {
		onSelectRoot: root => {
			projectRoot = root;
			console.log('Setting project root to:' + projectRoot);
		}
	});
	window.load_file = Actions.loadFile.bind(actionScope, editor);
	window.parse_user_config = Actions.parseUserConfig.bind(actionScope, editor);
});
