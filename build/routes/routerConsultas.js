"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerConsultas_1 = __importDefault(require("../controller/controllerConsultas"));
class RouterConsultas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/pdt/:id', controllerConsultas_1.default.listOnePDT);
    }
}
const routerConsultas = new RouterConsultas();
exports.default = routerConsultas.router;