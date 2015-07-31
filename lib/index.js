var winston = require('winston')
    ,express = require('express')
    ,path = require('path');

exports.start = function(port,options){
    require('winston-mongo').MongoDB;
    winston.add(winston.transports.MongoDB, options);

    var app = express();
    app.use(express.static(path.join(__dirname, 'static')));
    app.use(express.static(path.join(__dirname, 'static/html')));
    app.use(express.static(path.join(__dirname, 'static/js')));
    app.use(express.static(path.join(__dirname, 'static/css')));
    app.use(express.static(path.join(__dirname, 'static/imag')));
    app.use(require('./router'));
    app.listen(port);
};

exports.logger = winston;