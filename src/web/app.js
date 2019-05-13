import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import Constants from "./Constants";
import KeyChords from "./KeyChords";

$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html",
		showPrintMargin: false,
		theme: "ace/theme/gruvbox",
		keyboardHandler: "ace/keyboard/vim",
		behavioursEnabled: true
	});
	let isKeyChordInProgress = false,
		chordsSoFar = '';
	editor.container.addEventListener('keydown', (evt) => {
		const isInsertMode = editor.state.cm.state.vim.insertMode;
		if (!isInsertMode) { // User needs to not be in insert mode for us to process keychords
			if (evt.code === "Space") { //start capturing keychords beggining with a space keystroke
				isKeyChordInProgress = true;
			} else if (isKeyChordInProgress) { // If there is a keychord in progress already, record the keystrokes
				chordsSoFar += evt.key;
				evt.stopPropagation();
				evt.preventDefault();
			}
			if (chordsSoFar.length === 3) { // Limit chord length to 3
				let actionToTake = KeyChords[chordsSoFar];
				if (!actionToTake) {
					console.log(`No mapping found for ${chordsSoFar}`);
				} else if (typeof actionToTake === 'string') {
					console.log(`found action:${actionToTake}`);
				}
				/**
				 * Reset these vars before breaking out regardless of whether the users keychords were a success / failure
				 * since the max length of 3 keychords has been reached
				 */
				isKeyChordInProgress = false;
				chordsSoFar = '';
			}
		}
	}, true);
	RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");

	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
});