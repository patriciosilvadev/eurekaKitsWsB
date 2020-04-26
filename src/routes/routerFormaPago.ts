import { Router } from 'express';
import  controllerFormaPago from '../controller/controllerFormaPago';
class RouterFormaPago {
    router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void{
        this.router.post('/', controllerFormaPago.createfp);
    }
}
const routerFormaPago =  new RouterFormaPago();
export default routerFormaPago.router;