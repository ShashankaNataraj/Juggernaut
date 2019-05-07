import * as $ from "jquery";

$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html"
	});
	editor.setTheme("ace/theme/github");
	editor.setKeyboardHandler("ace/keyboard/vim");
	editor.setBehavioursEnabled(true);
	editor.commands.addCommand({
		name: 'Search For Files',
		bindKey: {mac: 'Cmd-Shift-O'},
		exec: function (editor){
			alert(1);
		},
		readOnly: true // false if this command should not apply in readOnly mode
	});
	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
});