const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('80547765690-kd7g6q5ui91mrt3m19vpdehkjeup7ufr.apps.googleusercontent.com');

export const validarGoogleIDToken = async (token: string) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                '80547765690-kd7g6q5ui91mrt3m19vpdehkjeup7ufr.apps.googleusercontent.com',
                '80547765690-kta9q332qrrjv7lfs146jcgmn6hj6q83.apps.googleusercontent.com'
            ],
        });
        const payload = ticket.getPayload();

        // console.log(payload);

        return {
            nick: payload.name,
            username: payload.name,
            picture: payload.picture,
            email: payload.email,
        }
    } catch (e) {
        // console.log(e)
        return null;
    }

}