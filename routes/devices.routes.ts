import { Request, Response } from 'express';
import { router as app } from './router';
import { Devices } from '../models/devices.model';
import { Users } from '../models/users.model';
import Tags from '../models/tags.model';

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

// Obtener dispositivo por usuario
app.get('/devices/user/:user', (req: Request, res: Response) => {

    let user = req.params.user;

    Devices.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password'],
                }
            },
            {
                model: Tags,
                attributes: {
                    exclude: ['deviceId'],
                }
            }
        ],
        attributes: {
            exclude: ['userId']
        }, where: { userId: user }
    })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});


app.post('/devices', (req: Request, res: Response) => {

    const body = req.body;

    Devices.create({
        token: body.token,
        name: body.name,
        userId: body.userId,
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});




//Borrar dispositivo
app.delete('/devices/:ide', (req: Request, res: Response) => {
    let ide = req.params.ide;

    Devices.destroy({ where: { id: ide } })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));
});

export default app;