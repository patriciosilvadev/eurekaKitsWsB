"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./security/keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.databasep);
pool.then((r) => r.getConnection().then((connection) => {
    r.releaseConnection(connection);
    console.log('Conexion online');
}));
exports.default = pool;
