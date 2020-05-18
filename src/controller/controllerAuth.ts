import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Persona } from '../models/Persona';
import { Login } from '../models/Auth';
import pool from '../database';
import helpers from '../libs/helpers'
import whatsapp from '../middlewares/whatsapp'
class ControllerAuth {
    public async loginUp(req: Request, res: Response): Promise<any> {
        const { idtelefono, iddireccion, cedula, nombres, apellidos, fechanacimiento, email, password, requerimiento, estado } = req.body;
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
        newPersona.password = await helpers.encriptPassword(password);
        const user = (await pool).query('INSERT INTO persona SET ?', [newPersona]);
        const newUser = (await user);
        const result = newUser.insertId;
        if(result > 0){
            console.log('despues de guradr',newPersona);
           // const datesPerson = `${newPersona.nombres}/${newPersona.apellidos}/${newPersona.cedula}/${newPersona.idtelefono}/${newPersona.requerimiento}`;
          //  whatsapp.whassap(datesPerson);
          console.log('whassap yo lo  bloqueo por pruebas jejejejej')
            const payload = { subject: newUser.insertId }
            const token = jwt.sign(payload, 'secret');
            return res.status(200).send({ token });
        }else {
            return res.status(204).send('ERROR AL REGISTRAR');
        }
    }
    public async loginIn(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const newUser: Login = {
            email: email,
            password: password
        }
        const row = (await pool).query('SElECT * FROM persona Where email = ?', [newUser.email]);
        const newrow = (await row);
        if (newrow[0] !== undefined) {
            const user = newrow[0];
            const validPassword = await helpers.matchPassword(newUser.password, user.password);
            if (validPassword) {
                console.log('PRUEBA ', user.idpersona);
                const id = user.idpersona;
                const payload = { subject: user.idpersona }
                const token = jwt.sign(payload, 'secret');
                return res.status(200).send({ token });
            } else {
                return res.status(401).send('PASSWORD INCORRECTO');
            }
        } else {
            return res.status(401).send('USUARIO NO ENCONTRADO');
        }
    }
}
const controllerAuth = new ControllerAuth();
export default controllerAuth;