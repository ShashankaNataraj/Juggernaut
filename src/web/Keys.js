export default class Keys{
    static bindShortcuts(editor, events){
        editor.commands.addCommand({
            name: 'Search For Files',
            bindKey: {mac: 'Cmd-Shift-O'},
            exec: function (editor){
                events['find-files-dialog'](editor);
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
    }
}