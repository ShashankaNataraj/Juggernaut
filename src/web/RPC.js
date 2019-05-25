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
		cfg.cmd = cfg.cmd || 'list';
		this.invoke(cfg);
	}
	static listDirs(cfg){
		cfg.cmd = cfg.cmd || 'listDirs';
		cfg.home = cfg.home || false;
		cfg.path = cfg.path || '';
		this.invoke(cfg);
	}

	static listHomeFiles(cfg){
		cfg.cmd = cfg.cmd || 'listHome';
		this.invoke(cfg);
	}
}