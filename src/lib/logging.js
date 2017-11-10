'use strict';

const config = require('../config');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const LOGGING_DIR = path.resolve(__dirname, '../../logs/');

if(config.env.logToFile) {
    try {
        fs.mkdirSync(LOGGING_DIR);
    } catch(e) {
        if(e.code !== 'EEXISTS') {
            console.log('here', e);
            config.env.logToFile = false;
        }
    }
}

if(config.env.logToFile) {
    winston.configure({
        transports: [
            new (winston.transports.File)({
                name: 'info-file',
                level: 'info',
                filename: path.join(LOGGING_DIR, 'calls.log'),
                maxsize: 1024 * 100,
                maxFiles: 3,
                timestamp: true
            }),
            new (winston.transports.File)({
                name: 'error-file',
                level: 'error',
                filename: path.join(LOGGING_DIR, 'errors.log'),
                maxsize: 1024 * 100,
                maxFiles: 3,
                timestamp: true
            })
        ]
    });
} else {
    winston.configure({
        transports: [ new (winston.transports.Console)({timestamp: true})]
    });
}

function info(obj, prefix) {
    if(prefix) {
        winston.info(prefix, obj);
    } else {
        winston.info(obj);
    }
}

function error(obj, prefix) {
    if(prefix) {
        winston.error(prefix, obj);
    } else {
        winston.error(obj);
    }
}

module.exports = {
    info,
    error
};