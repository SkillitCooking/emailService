'use strict';

const config = require('../config');
const fs = require('fs');

function initialize() {
    //set up fs if needed
    if(config.db.client === 'sqlite3') {
        try {
            fs.mkdirSync(config.data);
        } catch (e) {
            if(e.code !== 'EEXIST') {
                throw e;
            }
        }
    }
    //return initialized knex
    const db = require('knex')(config.db);
    return db;
}

module.exports = {
    initialize
};