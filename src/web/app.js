import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html",
		showPrintMargin:false,
		theme:"ace/theme/github",
		keyboardHandler:"ace/keyboard/vim",
		behavioursEnabled:true
	});
	Keys.bindShortcuts(editor, {
		'find-files-dialog':function(editor){
			Swal.fire({
				html:Templates.getTemplate('find-files-dialog',{}),
				showConfirmButton:false
			});
		}
	})
	
	external.invoke(JSON.stringify({cmd:"read",file:"/Users/shasn/Code/Juggernaut/dist/index.html"}));
	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
});