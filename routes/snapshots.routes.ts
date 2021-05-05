import { Request, Response } from 'express';
import { router as app } from './router';
import { Snapshots } from '../models/snapshots.model';
import { Locations } from '../models/locations.model';
import { Devices } from '../models/devices.model';
import { Users } from '../models/users.model';

app.get('/snapshots', (_req: Request, res: Response) => {
    Snapshots.findAll({
        include: [
            {
                model: Locations,
            },
            {
                model: Devices,
                include: [
                    {
                        model: Users,
                    }
                ],
                attributes: {
                    exclude: ['userId'],
                }
            },
        ],
        attributes: {
            exclude: ['locationId', 'deviceId'],
        }
    })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});

//Obtener un snapshot por un dispositivo
app.get('/snapshots/:deviceID', (req: Request, res: Response) => {
    let deviceID = req.params.deviceID;

    Snapshots.findAll({
        include: [
            {
                model: Locations,
            },
            {
                model: Devices,
                include: [
                    {
                        model: Users,
                    }
                ],
                attributes: {
                    exclude: ['userId'],
                }
            },
        ],
        attributes: {
            exclude: ['locationId', 'deviceId'],
        }, where: { deviceId: deviceID }
    })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});

app.post('/snapshots', (req: Request, res: Response) => {

    const body = req.body;

    Snapshots.create({
        deviceId: body.deviceId,
        locationId: body.locationId,
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

export default app;