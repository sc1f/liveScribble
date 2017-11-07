import express from 'express';  
import webpack from 'webpack';  
import path from 'path';  
import config from '../webpack.config.dev';  
import open from 'open';
import socket from 'socket.io';
import { Server } from 'http';
//import favicon from 'serve-favicon';

/* eslint-disable no-console */

const port = 5000;
const app = express();
const server = Server(app);
const compiler = webpack(config);
const io = socket(server);


app.use(require('webpack-dev-middleware')(compiler, {  
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));  

app.get('*', function(req, res) {
  console.log('get route');
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

io.on('connection', function(socket) {
    console.log('a user connected!');
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});