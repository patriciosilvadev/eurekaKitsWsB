"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ControllerFormaPago {
    createfp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idfactura, idtipopago, estado } = req.body;
            let newFormaPago = {
                idfactura: idfactura,
                idtipopago: idtipopago,
                estado: estado,
                created_at: new Date
            };
            const fp = yield (yield database_1.default).query('INSERT INTO formapago SET ?', [newFormaPago]);
            const result = fp.insertId;
            if (result > 0) {
                return res.status(200).send({ message: 'Registrado' });
            }
            else {
                return res.status(204).send({ message: 'No Registrado' });
            }
        });
    }
    updateEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body;
            console.log(req.body);
            const newFormaPago = {
                estado: estado,
            };
            const formaPagoEstado = yield (yield database_1.default).query('UPDATE  formapago SET ? WHERE idformapago=?', [newFormaPago, id]);
            const result = formaPagoEstado.affectedRows;
            if (result > 0) {
                return res.status(200).send({ message: 'Actualizado' });
            }
            else {
                return res.status(204).send({ message: 'No Actualizado' });
            }
        });
    }
}
const controllerFormaPago = new ControllerFormaPago();
exports.default = controllerFormaPago;
