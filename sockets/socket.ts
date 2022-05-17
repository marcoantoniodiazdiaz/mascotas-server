import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { SalasLista } from '../classes/salas-lista';
import { Sala } from '../classes/sala';
import { startGame } from '../classes/game';


export const usuariosConectados = new UsuariosLista();
export const salas = new SalasLista();


export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('connect', () => {
        console.log('Nuevo cliente conectado')
    });

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    io.emit('usuarios-activos', usuariosConectados.getLista());
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('🔴  Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { username: string, database: number }) => {
        console.log(payload)
        usuariosConectados.actualizarNombre(cliente.id, payload.username, payload.database);
        console.log(usuariosConectados.getUsuario(cliente.id));
        salas.reeconectarASala(cliente);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}


// Obtener Usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Crear nueva sala
export const crearSala = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('nueva-sala', (payload: { sala: string }) => {
        const nuevaSala = new Sala(cliente.id, payload.sala);
        salas.agregar(nuevaSala);
        cliente.join(nuevaSala.id);
        io.to(nuevaSala.id).emit('confirmacion-sala', {
            ok: true,
            data: 'El juego se genero exitosamente',
        });
    });
}

// Testing
export const testing = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('testing', () => {
        io.to(cliente.id).emit('escuche', {
            message: 'Te escuche'
        });
    });
}

// Unirme al juego
export const unirmeAlJuego = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('unirme-al-juego', (payload: { sala: string }) => {

        if (salas.comprobarExistencia(payload.sala) == null) {
            return io.to(cliente.id).emit('confirmacion-de-union', {
                ok: false,
                err: 'La sala no existe',
            });
        }

        salas.agregarASala(payload.sala, cliente.id);
        cliente.join(payload.sala);

        const usuario = usuariosConectados.getUsuario(cliente.id);

        console.log(usuario?.username + ' se unio a ' + payload.sala);

        io.to(payload.sala).emit('confirmacion-de-union', {
            ok: true,
            data: usuario?.username + ' sido añadido al juego exitosamente',
            users: salas.verUsuariosEnUnaSala(payload.sala).map(e => {
                return usuariosConectados.getUsuario(e.usuario);
            }),
        });

    });
}

