import { Request, Response } from 'express';
import  { Persona }  from '../models/Persona';
import pool from '../database';
import helpers from '../libs/helpers'
class ControllerPersona {
    public async listOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const personaOne = await (await pool).query('SELECT * FROM persona WHERE idpersona=?', [id]);
        if (personaOne.length > 0) {
            return res.json(personaOne[0]);
        }else{
            return res.status(204).send({message: 'No Datos'});
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        const { idtelefono,iddireccion,cedula,nombres,apellidos,fechanacimiento,email,password,requerimiento,estado} = req.body;
        console.log(req.body);        
        let newPersona: Persona = {
            idtelefono: idtelefono,
            iddireccion: iddireccion,
            cedula: cedula,
            nombres: nombres,
            apellidos: apellidos,
            fechanacimiento: new Date(fechanacimiento),
            email: email,
            password: password,
            requerimiento: requerimiento,
            estado: estado,
            created_at: new Date
        };
        console.log(newPersona);
        newPersona.password = await helpers.encriptPassword(password);
        const persona = await (await pool).query('INSERT INTO persona SET ?', [newPersona]);
        const result = persona.insertId;
        if(result > 0){
            res.status(200).send({message: 'Persona Guardada'})
        } else {
            res.status(204).send({message: 'Error al Guardar'})
        }
    }
    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { idtelefono,iddireccion,cedula,nombres,apellidos,fechanacimiento,email,password,requerimiento,estado} = req.body;
        let newPersona: Persona = {
            idtelefono: idtelefono,
            iddireccion: iddireccion,
            cedula: cedula,
            nombres: nombres,
            apellidos: apellidos,
            fechanacimiento: fechanacimiento,
            email: email,
            password: password,
            requerimiento: requerimiento,
            estado: estado,
            created_at: new Date
        }
        const personaPut = await (await pool).query('UPDATE  persona SET ? WHERE idpersona=?', [newPersona, id]);
        console.log(personaPut);
        const result = personaPut.affectedRows;
        if(result > 0){
            res.status(200).send({message: 'Persona Actualizada'});
        } else {
            res.status(204).send({message: 'Error al Actualizada'});
        }
    }
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { estado } = req.body;
        let newPersona: Persona = {
            estado: estado
        }
        const personDel = await (await pool).query('UPDATE  persona SET ? WHERE idpersona=?', [newPersona, id]);
        const result = personDel.affectedRows;
        if(result > 0){
            res.status(200).send({message: 'Persona Delete'});
        } else {
            res.status(204).send({message: 'Error al Delete'});
        }
    }
}
const controllerPersona = new ControllerPersona();
export default controllerPersona;