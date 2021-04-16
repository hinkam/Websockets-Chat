import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../../.env')});
import express from 'express';
import ws from 'ws';
import { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { getDatabase } from './database';
import { indexRouter } from './routes/';
import "reflect-metadata";

let server : Server;

const app = express();
const port = 3000;

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => {
        wsServer.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(message);
              }
        })
    });
})


getDatabase();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', indexRouter);

server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });