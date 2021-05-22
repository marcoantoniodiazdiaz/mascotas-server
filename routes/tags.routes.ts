import { Request, Response } from 'express';
import { router as app } from './router';
import Tags from '../models/tags.model';

app.post('/tags', (req: Request, res: Response) => {

    const body = req.body;

    Tags.create({
        text: body.text,
        deviceId: body.deviceId,
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

app.delete('/tags/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    Tags.destroy({
        where: { id }
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

export default app;