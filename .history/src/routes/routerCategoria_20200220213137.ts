import { Request, Response } from 'express';
import { Router } from 'express';
import  controllerCategoria from '../controller/controllerCategoria';
class RouterCategoria {
    router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void{
        // this.router.get('/', controllerCategoria.listAll);
        this.router.get('/', (req: Request , res: Response)=>{
            res.send('categoria')
        });
        this.router.get('/:id', controllerCategoria.listOne);
        this.router.post('/', controllerCategoria.create);
        this.router.put('/:id', controllerCategoria.update);
        this.router.delete('/:id', controllerCategoria.delete);
    }
}
const routerCategoria =  new RouterCategoria();
export default routerCategoria.router;