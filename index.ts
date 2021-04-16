import Server from './classes/server';
import router from './routes/router';

import users from './routes/users.routes';
import devices from './routes/devices.routes';
import snapshots from './routes/snapshots.routes';
import locations from './routes/locations.routes';
// 
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Rutas hijas
const server = Server.instance;

// BodyParser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', (express.static('public', { redirect: false })));

// Rutas de servicios
server.app.use('/api', router);
server.app.use('/api', users);
server.app.use('/api', devices);
server.app.use('/api', snapshots);
server.app.use('/api', locations);

// Angular
// server.app.get('*', (req, res, next) => {
//     res.sendFile(path.resolve('public/index.html'));
// });

server.start(() => {
    console.log(`✅  Server online in port ${server.port}`);
});


