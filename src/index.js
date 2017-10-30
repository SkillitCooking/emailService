'use strict';

const path = require('path');
const ROOT = path.resolve(__dirname, '../');

require('dotenv').config({path: path.join(ROOT, 'bin/.env')});
const config = require('./config');
const lib = require('./lib');
const test = require('./test');

try {
    //initialize knex
    lib.logging.info('POLLING START');
    const db = lib.db.initialize();
    let promises = [];
    test.array.forEach(data => {
        promises.push(lib.mailing.sendMail('test.hbs', data, 'dane@skillitcooking.com'));
    });
    Promise.all(promises).then(() => {
        lib.logging.info('POLLING END');
    }).catch(err => {
        throw new Error(err);
    });
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
}
