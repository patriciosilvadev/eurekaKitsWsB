import express, { Application } from 'express';
class Server {
    private app: Application;
    constructor() {
        this.app = express();
    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
    }
    routes(): void{

    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server online in the port',this.app.get('port'));
            
        })
    }
}
new Server();
