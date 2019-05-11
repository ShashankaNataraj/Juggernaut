import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";

$(() => {
	let editor = ace.edit(document.querySelector('#editor'), {
		mode: "ace/mode/html",
		showPrintMargin:false,
		theme:"ace/theme/gruvbox",
		keyboardHandler:"ace/keyboard/vim",
		behavioursEnabled:true
	});
	editor.container.addEventListener('keydown', function(a,b,c){
		console.log(a);
		console.log(b);
		console.log(c);
	}, true)
	Keys.bindShortcuts(editor, {
		'find-files-dialog':function(editor){
			Swal.fire({
				html:Templates.getTemplate('find-files-dialog',{}),
				showConfirmButton:false
			});
		}
	})
	RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");
	
	window.load_file = function (content){
		editor.setValue(content);
		editor.gotoLine(0);
	};
});