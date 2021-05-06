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
    //console.log("device",device);
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
        const location = await Locations.create({
            latitude: lat,
            longitude: lon,            
        }, {transaction: t});
        console.log("id location "+location.getDataValue('id'));
        console.log("id device"+device?.getDataValue('id'))
        const snapshot = await Snapshots.create({
            locationId:  location.getDataValue('id'),
            deviceId: device?.getDataValue('id'),
           
        }, { transaction: t });
        await t.commit();
        // Todo salio bien
        res.json({
            ok: true,
            location:location,
            snpa:snapshot

        });
    } catch (error) {
        res.json({
            ok: false
        });
        t.rollback();
    }




});

export default app;