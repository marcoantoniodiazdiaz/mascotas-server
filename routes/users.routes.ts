import { Request, Response } from 'express';
import { router as app } from './router';
import { Users } from '../models/users.model';
import bcrypt from 'bcrypt';

app.get('/users', (req: Request, res: Response) => {
    Users.findAll()
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));

});

app.post('/users', (req: Request, res: Response) => {

    const body = req.body;

    Users.create({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    }).then((data) => res.json({ ok: true, data })
    ).catch((err) => res.status(400).json({ ok: false, err, }));

});

//Obtener un usuario
app.get('/users/:ide', (req: Request, res: Response) => {

    let ide = req.params.ide;

    Users.findByPk(ide)
        .then((data) => res.json({ ok: true, data })
        ).catch((err) => res.status(400).json({ ok: false, err, }));
});


export default app;

//Prueba