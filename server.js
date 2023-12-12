const express = require('express');
const app = require('./app');
const http = require('http');

var server = http.createServer(app);
server.listen(3000);