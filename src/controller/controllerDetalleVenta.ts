import { Request, Response } from 'express';
import pool from '../database';
import { DetalleVenta } from '../models/DetalleVenta';
class ControllerDetalleVenta {
    public async listAll(req: Request, res: Response) {
        const detalleVenta = await (await pool).query('SELECT * FROM detalleventa');
        if (detalleVenta > 0) {
            return res.json(detalleVenta);
        }
        res.status(404).send('the consutl detalleventa not exist');
    }
    public async create(req: Request, res: Response): Promise<any> {
        const { idfactura, idproducto, cantidad, precio, total, estado } = req.body;
        console.log(req.body);
        let newDetalleVenta: DetalleVenta = {
            idfactura: idfactura,
            idproducto: idproducto,
            cantidad: cantidad,
            precio: precio,
            total: total,
            estado: estado,
            created_at: new Date
        };
        console.log(newDetalleVenta);
        await (await pool).query('INSERT INTO detalleventa SET ?', [newDetalleVenta]);
        res.json({ message: 'Venta Saved' });
    }
    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await (await pool).query('DELETE FROM detalleventa WHERE iddetalleventa=?', [id]);
        res.json({ message: 'Venta Delete' })
    }
}
const controllerDetalleVenta = new ControllerDetalleVenta();
export default controllerDetalleVenta;