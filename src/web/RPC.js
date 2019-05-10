export default class RPC{
    static invoke(command){
        external.invoke(JSON.stringify(command));
    }
    static readFile(file){
        this.invoke({cmd:"read",file})
    }
    static writeFile(){

    }
}