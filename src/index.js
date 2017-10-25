'use strict';

require('dotenv').config({path: '../bin/.env'});
const config = require('./config');
const lib = require('./lib');

try {
    //initialize knex
    lib.logging.info('POLLING START');
    const db = lib.db.initialize();
    lib.logging.info('POLLING END');
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
}
