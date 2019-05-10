export default class Keys{
    static onCommandExec(events,event, editor){
        let fn = events[event];
        if (fn){
            fn(editor);
        }else {
            throw(new Exception(`No event found for key ${event}`));
        }
    }
    static bindShortcuts(editor, events){
        editor.commands.addCommand({
            name: 'Search For Files',
            bindKey: {mac: 'Cmd-Shift-O'},
            exec: this.onCommandExec.bind(this, events, 'find-files-dialog',editor),
            readOnly: true // false if this command should not apply in readOnly mode
        });
    }
}