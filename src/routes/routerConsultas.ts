import { Router } from 'express';
import  controllerConsultas from '../controller/controllerConsultas';
class RouterConsultas {
    router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/pdt/:id', controllerConsultas.listOnePDT);
        this.router.get('/promopp', controllerConsultas.promocionPP);
        this.router.get('/promoppi', controllerConsultas.promocionPPI);
        this.router.get('/promouni/:id', controllerConsultas.promocionUni);
        this.router.get('/devedvp/:id', controllerConsultas.detalleVentadvp);
        this.router.get('/numfact', controllerConsultas.onGetNumFactura);
        this.router.get('/idfact', controllerConsultas.onGetIdFactura);
        this.router.get('/productouni/:id', controllerConsultas.productouni);
        this.router.get('/personafactura/:id', controllerConsultas.onGetPersonaFactura);
        this.router.get('/tipopago', controllerConsultas.onGetTipoPago);
        this.router.get('/pfpaypal/:id', controllerConsultas.onGetPagoFactPaypal); // muestra solo las facturas echas en paypal
        this.router.get('/pftransbanc/:id', controllerConsultas.onGetPagoFactTransBanc); // muestra solo las facturas echas en Transfer bancaria
        this.router.get('/pfefectivo/:id', controllerConsultas.onGetPagoFactEfectivo); // muestra solo las facturas echas en efectivo
        this.router.get('/pfindiv/:id', controllerConsultas.onGetPagoFactIndiv); // muestra los datos por el numero de factura
        this.router.get('/pagopaypal/:id', controllerConsultas.onGetPagoPaypal); // muestra el pago final de paypal
        this.router.get('/pagotransbanc/:id', controllerConsultas.onGetPagoTransBanc); // muestra el pago final de Transfer bancaria
        this.router.get('/pagoefectivo/:id', controllerConsultas.onGetPagoEfectivo); // muestra el pago final de efectivo
    }
}
const routerConsultas =  new RouterConsultas();
export default routerConsultas.router;