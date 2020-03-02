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
            const cliente = yield (yield database_1.default).query('SELECT * FROM categoria');
            res.json(cliente);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clienteOne = yield (yield database_1.default).query('SELECT * FROM categoria WHERE idCategoria=?', [id]);
            if (clienteOne.length > 0) {
                return res.json(clienteOne[0]);
            }
            res.status(404).json({ text: 'the client not exist' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = req.body;
           // const { filename } = req.file;
            let newCategoria = {
                nombre: datos.nombre,
            //    image: '/uploads/' + filename,
                estado: datos.estado
            };
            console.log(newCategoria);
            yield (yield database_1.default).query('INSERT INTO categoria SET ?', [newCategoria]);
            ;
            res.json({ message: 'Categoria saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).query('UPDATE  categoria SET ? WHERE idCategoria=?', [req.body, id]);
            res.json({ message: 'update client' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).query('DELETE FROM categoria WHERE idCategoria=?', [id]);
            res.json({ message: ' Person delete' });
        });
    }
}
const controllerCategoria = new ControllerCategoria();
exports.default = controllerCategoria;
