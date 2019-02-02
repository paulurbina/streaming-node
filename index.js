const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const streamingService = require('./lib/service/streamingService');
const errorhandler = require('errorhandler');
const rutas = require('./routes/index');

var server;

const app = express();

    app.set('port', process.env.PORT || 1212);
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride());
    app.use('/', rutas.index);
    app.use(express.static(path.join(__dirname, 'public')));

    if(process.env.NODE_ENV === 'development') {
        app.use(errorhandler())
    }

    server = app.listen(app.get('port'), () => {
        console.log('server listening on port', app.get('port'));
    });


streamingService.start(server);