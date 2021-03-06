"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const uuidv1 = require('uuid/v1');
require('dotenv').config();
// tests
const issueRoutes_1 = require("./routes/issueRoutes");
const projectRoutes_1 = require("./routes/projectRoutes");
const fcc_testing_1 = require("./routes/fcc-testing");
class App {
    constructor() {
        this.app = express();
        this.issueRoutes = new issueRoutes_1.default();
        this.projectRoutes = new projectRoutes_1.default();
        this.fccTestingRoute = new fcc_testing_1.default();
        this.mongoSetup();
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(cors({ optionSuccessStatus: 200, origin: '*' }));
        this.app.use(helmet());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.xssFilter());
        // secure cookies with express-session
        const sessionConfig = {
            secret: process.env.SECRET_KEY,
            genid: () => uuidv1(),
            cookie: {},
            resave: true,
            saveUninitialized: true
        };
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.set('trust proxy', 1); // trust first proxy
            sessionConfig.cookie.secure = true; // serve secure cookies
        }
        this.app.use(session(sessionConfig));
        this.fccTestingRoute.routes(this.app);
        this.projectRoutes.routes(this.app);
        this.issueRoutes.routes(this.app);
        if (process.env.NODE_ENV === 'test') {
            // this.app.set('trust proxy', 1); // trust first proxy <--- production
            // sessionConfig.cookie.secure = true; // serve secure cookies
            // Serve any static files
            this.app.use(express.static(path.join(__dirname, '../../frontend/build')));
            // Handle React routing, return all requests to React app
            this.app.get('/*', (req, res) => {
                res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
            });
        }
        //404 Not Found Middleware
        this.app.use((req, res, next) => {
            res
                .status(404)
                .type('text')
                .send('Not Found');
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        mongoose.set('useFindAndModify', false);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map