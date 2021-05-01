
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';


import * as socket from '../sockets/socket';
import { createAssosiations } from '../database/assosiations';
import sequelize from '../database/database';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
        this.mysqlConnect();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }


    private async mysqlConnect() {
        createAssosiations();
        sequelize.sync({ force: false }).then(() => {
            console.log("✅  MySQL connection");
        }).catch((err) => {
            console.error(err);
        });
    }

    private escucharSockets() {
        console.log('✅  Socket server online');

        this.io.on('connection', cliente => {
            // Conectar cliente
            socket.conectarCliente(cliente, this.io);
            // Desconectar cliente
            socket.desconectar(cliente, this.io);
            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);
            // Obtener usuarios
            socket.obtenerUsuarios(cliente, this.io);
            // Crear sala
            socket.crearSala(cliente, this.io);
            // Unirme al juego
            socket.unirmeAlJuego(cliente, this.io);
            // Unirme al juego
            socket.comienzaElJuego(cliente, this.io);
        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }

}