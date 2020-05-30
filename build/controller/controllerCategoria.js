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
class ControllerCategoria {
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield (yield database_1.default).query('SELECT * FROM categoria');
            const result = categoria.length;
            if (result > 0) {
                return res.json(categoria);
            }
            else {
                return res.status(204).send({ message: 'No Encontrado' });
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clienteOne = yield (yield database_1.default).query('SELECT * FROM categoria WHERE idcategoria=?', [id]);
            const result = clienteOne.length;
            if (result > 0) {
                return res.json(clienteOne);
            }
            else {
                return res.status(204).send({ message: 'No Encontrado' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, estado } = req.body;
            const { filename } = req.file;
            console.log(filename);
            const newCategoria = {
                nombre: nombre,
                image: '/uploads/' + filename,
                estado: estado,
                created_at: new Date
            };
            const newCate = yield (yield database_1.default).query('INSERT INTO categoria SET ?', [newCategoria]);
            const result = newCate.insertId;
            if (result > 0) {
                return res.status(200).send({ message: 'Registrado' });
            }
            else {
                return res.status(204).send({ message: 'No Registrado' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, estado } = req.body;
            const { filename } = req.file;
            let newCategoria = {
                nombre: nombre,
                image: '/uploads/' + filename,
                estado: estado
            };
            const categoriaPut = yield (yield database_1.default).query('UPDATE  categoria SET ? WHERE idcategoria=?', [newCategoria, id]);
            const result = categoriaPut.affectedRows;
            if (result > 0) {
                return res.status(200).send(true);
            }
            else {
                return res.status(204).send({ message: 'No Actualizado' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body;
            let newCategoria = {
                estado: estado
            };
            const categoriaPut = yield (yield database_1.default).query('UPDATE  categoria SET ? WHERE idcategoria=?', [newCategoria, id]);
            const result = categoriaPut.affectedRows;
            if (result > 0) {
                return res.status(200).send({ message: 'Eliminado' });
            }
            else {
                return res.status(204).send({ message: 'No Eliminado' });
            }
        });
    }
}
const controllerCategoria = new ControllerCategoria();
exports.default = controllerCategoria;
