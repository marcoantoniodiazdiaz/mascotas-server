import { Request, Response } from 'express';
import { router as app } from './router';
import { Devices } from '../models/devices.model';
import { Users } from '../models/users.model';
import { usuariosConectados } from '../sockets/socket';
import Server from '../classes/server';
import { Locations } from '../models/locations.model';
import { Snapshots } from '../models/snapshots.model';
import { Sequelize } from 'sequelize';
import sequelize from '../database/database';

app.get('/emit/lat/:lat/lon/:lon/token/:token', async (req: Request, res: Response) => {

    const lat = req.params.lat;
    const lon = req.params.lon;
    const token = req.params.token;

    const device = await Devices.findOne({
        where: { token: token },
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: Users,
            }
        ]
    });

    const idUsuario: number = device?.getDataValue('user').getDataValue('id');
    const idSocket = usuariosConectados.verIdDeSocket(idUsuario);

    const server = Server.instance;

    server.io.to(idSocket!).emit('reenviando-localizacion', {
        lat,
        lon,
        token,
    });

    // Aqui comienzan
    const t = await sequelize.transaction();

    try {
        // Aqui su codigo
    } catch (error) {
        t.rollback();
    }


    res.json({
        ok: true,
    });

});

export default app;