import { Request, Response } from 'express';
import { router as app } from './router';
import { Locations } from '../models/locations.model';

app.get('/locations', (req: Request, res: Response) => {
    Locations.findAll({
    })
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});

app.post('/locations', (req: Request, res: Response) => {

    const body = req.body;

    Locations.create({
        latitude: body.latitude,
        longitude: body.longitude,
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

export default app;