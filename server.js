import express from 'express';
import { WebSocketServer } from "./src/lib/WebSocketServer.js";
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.listen(3000);

const WSServer = new WebSocketServer({ port: 8080 });