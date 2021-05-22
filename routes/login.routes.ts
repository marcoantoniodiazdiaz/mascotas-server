import { Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Users from '../models/users.model'
// import { validarGoogleIDToken } from '../helpers/google-verify-token';

app.post('/login', async (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === '' || body.email === '') {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    try {
        const user = await Users.findOne({ where: { email: body.email } });

        if (user) {
            if (!bcrypt.compareSync(body.password, user.getDataValue('password'))) {
                return res.status(400).json({
                    ok: false,
                    err: 'La contraseña es incorrecta'
                });
            }

            let token = jwt.sign(
                { user }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
            );

            res.json({
                ok: true,
                data: user,
                token
            });

        } else {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }

    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: 'Ocurrio un error interno, contacta con soporte'
        });
    }
});

export default app;