import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html",
		showPrintMargin:false,
		theme:"ace/theme/github",
		keyboardHandler:"ace/keyboard/vim",
		behavioursEnabled:true
	});
	editor.commands.addCommand({
		name: 'Search For Files',
		bindKey: {mac: 'Cmd-Shift-O'},
		exec: function (editor){
			Swal.fire({
				html:Templates.getTemplate('find-files-dialog',{}),
				showConfirmButton:false
			});
		},
		readOnly: true // false if this command should not apply in readOnly mode
	});
	external.invoke(JSON.stringify({cmd:"read",file:"/Users/shasn/Code/Juggernaut/dist/index.html"}));
	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
});