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
class ControllerEfectivo {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idformapago, numfactura, preciofactura, estado } = req.body;
            let newEfectivo = {
                idformapago: idformapago,
                numfactura: numfactura,
                preciofactura: preciofactura,
                estado: estado,
                created_at: new Date
            };
            const efect = yield (yield database_1.default).query('INSERT INTO efectivo SET ?', [newEfectivo]);
            const result = efect.insertId;
            if (result > 0) {
                res.status(200).send({ message: 'Registro exitoso' });
            }
            else {
                res.status(404).send({ message: 'Error exitoso' });
            }
        });
    }
}
const controllerEfectivo = new ControllerEfectivo();
exports.default = controllerEfectivo;
