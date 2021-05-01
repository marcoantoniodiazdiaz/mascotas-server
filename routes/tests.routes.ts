import { Request, Response } from 'express';
import { router as app } from './router';
import { DevicesLista } from '../classes/devices-lista';
import { Devices } from '../models/devices.model';
import { Users } from '../models/users.model';
import { usuariosConectados } from '../sockets/socket';
import socketIO from 'socket.io';
import Server from '../classes/server';

const devicesLista = new DevicesLista();

app.get('/emit/lat/:lat/lon/:lon/token/:token', async (req: Request, res: Response) => {

    const lat = req.params.lat;
    const lon = req.params.lon;
    const token = req.params.token;

    const informacion = await Devices.findOne({
        where: { token: token },
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: Users,
            }
        ]
    });

    const idUsuario: number = informacion?.getDataValue('user').getDataValue('id');
    const idSocket = usuariosConectados.verIdDeSocket(idUsuario);

    const server = Server.instance;

    server.io.to(idSocket!).emit('reenviando-localizacion', {
        lat,
        lon,
        token,
    });

    res.json({
        ok: informacion,
    });

});

export default app;