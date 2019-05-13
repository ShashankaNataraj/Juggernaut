import * as $ from 'jquery';
import Swal from 'sweetalert2';
import "./styles/styles.scss";
import Templates from "./TemplateMapping";
import Keys from "./Keys";
import RPC from "./RPC";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
$(() => {
	var html = Prism.highlight('console.log("asd")}', Prism.languages.javascript, 'javascript');
	console.log(html);
	document.getElementById('editor').innerHTML = html;
	// hljs.initHighlightingOnLoad();
	// RPC.readFile("/Users/shasn/Code/Juggernaut/dist/index.html");
	// document.querySelectorAll('pre code').forEach((block) => {
	// 	hljs.highlightBlock(block);
	// });
	// window.load_file = function (content){
	//
	// };
});