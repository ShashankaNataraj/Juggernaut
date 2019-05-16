import KeyChords from "./KeyChords";

export default class ChordsObserver {
	static resetChordState(){
		this.isKeyChordInProgress = false;
		this.chordsSoFar = [];
	}

	static init(cfg){
		this.resetChordState();
		cfg.editor.container.addEventListener('keydown', this.chordListener.bind(this,cfg), true);
	}

	static chordListener(cfg, evt){
		const isInsertMode = cfg.editor.state.cm.state.vim.insertMode;
		if (!isInsertMode) { // User needs to not be in insert mode for us to process keychords
			if (evt.code === "Space") { //start capturing keychords beggining with a space keystroke
				this.isKeyChordInProgress = true;
			} else if (this.isKeyChordInProgress) { // If there is a keychord in progress already, record the keystrokes
				evt.stopPropagation();
				evt.preventDefault();
				this.chordsSoFar.push(evt.key);
				const mergedChordConfig = {...KeyChords,...cfg.userKeyChords};
				const actionToTake = mergedChordConfig[this.chordsSoFar.join('')];
				if (!actionToTake) {
					console.log(`No mapping found for ${this.chordsSoFar}`);
				} else if (typeof actionToTake === 'string') {
					console.log(`found action:${actionToTake}`);
					this.resetChordState();
					if (cfg.onChordComplete){
						cfg.onChordComplete(actionToTake);
					} else {
						console.log('No handler found for ');
					}
				}
			}
			/**
			 * Reset vars before breaking out regardless of whether the users keychords were a success / failure
			 * since the max length of 3 keychords has been reached
			 */
			if (this.chordsSoFar.length === 3) { // Limit chord length to 3
				this.resetChordState();
			}
		}
	}
};