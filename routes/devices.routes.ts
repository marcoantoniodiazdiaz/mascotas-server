import { Request, Response } from 'express';
import { router as app } from './router';
import { Devices } from '../models/devices.model';
import { Users } from '../models/users.model';

app.get('/devices', (req: Request, res: Response) => {
    Devices.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password'],
                }
            },
        ],
        attributes: {
            exclude: ['userId'],
        }
    })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});

app.post('/devices', (req: Request, res: Response) => {

    const body = req.body;

    Devices.create({
        token: body.token,
        userId: body.userId,
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

export default app;