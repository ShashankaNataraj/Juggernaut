import KeyChords from "./KeyChords";

export default class ChordsObserver {
	static resetChordState(){
		this.isKeyChordInProgress = false;
		this.chordsSoFar = [];
	}

	static init(editor){
		this.resetChordState();
		editor.container.addEventListener('keydown', this.chordListener.bind(this,editor), true);
	}

	static chordListener(editor, evt){
		const isInsertMode = editor.state.cm.state.vim.insertMode;
		if (!isInsertMode) { // User needs to not be in insert mode for us to process keychords
			if (evt.code === "Space") { //start capturing keychords beggining with a space keystroke
				this.isKeyChordInProgress = true;
			} else if (this.isKeyChordInProgress) { // If there is a keychord in progress already, record the keystrokes
				evt.stopPropagation();
				evt.preventDefault();
				this.chordsSoFar.push(evt.key);
				let actionToTake = KeyChords[this.chordsSoFar.join('')];
				if (!actionToTake) {
					console.log(`No mapping found for ${this.chordsSoFar}`);
				} else if (typeof actionToTake === 'string') {
					console.log(`found action:${actionToTake}`);
					this.resetChordState();
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