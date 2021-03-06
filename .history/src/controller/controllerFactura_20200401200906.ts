import { Request, Response } from 'express';
import pool from '../database';
import { Factura } from '../models/Factura';
class ControllerFactura {
    public async listAll(req: Request, res: Response) {
        const detalleVenta = await (await pool).query('SELECT * FROM factura');
        res.json(detalleVenta);
    }
    public async create(req: Request, res: Response): Promise<any> {
        const { idpersona, idpago, subtotal,dto,iva, total, estado } = req.body;
        console.log(req.body);        
        let newFactura: Factura = {
            idpersona: idpersona,
            idpago: idpago,
            subtotal: subtotal,
            dto: dto,
            iva: iva,
            total: total,
            estado: estado,
            created_at: new Date,        
        };
        console.log(newFactura); 
        await (await pool).query('INSERT INTO factura SET ?', [newFactura]);
        ;
        res.json({ message: 'Factura Saved' });
    }
    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await (await pool).query('DELETE FROM detalleventa WHERE iddetalleventa=?', [id]);
        res.json({ message: 'Venta Delete' })
    }
}
const controllerFactura = new ControllerFactura();
export default controllerFactura;