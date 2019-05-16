export default class RPC {
	static invoke(command){
		external.invoke(JSON.stringify(command));
	}

	static readFile(file){
		this.invoke({cmd: "read", file})
	}

	static writeFile(cfg){
		this.invoke({cmd: "write", file: cfg.file, contents: cfg.contents})
	}

	static listFiles(cfg){
		this.invoke({cmd:"list", path:cfg.path})
	}
}