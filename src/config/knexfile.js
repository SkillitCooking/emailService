'use strict';
//get root

const path = require('path');
const ROOT = path.resolve(__dirname, '../');

const {DB_CLIENT, DB_CONNECTION, NODE_ENV} = process.env;
const isDev = NODE_ENV ? NODE_ENV  === 'development' : true;

const options = {
    client: DB_CLIENT || 'sqlite3',
    connection: DB_CONNECTION || path.join(ROOT, 'data/dev.sqlite3'),
    debug: isDev,
    seeds: {
        directory: path.join(ROOT, 'seeds')
    },
    useNullAsDefault: !DB_CLIENT || DB_CLIENT === 'sqlite3'
};

if(DB_CLIENT && DB_CLIENT !== 'sqlite3') {
    options.pool = {
        min: 2,
        max: 10
    };
}

module.exports = {
    development: Object.assign({}, options, {
        connection: DB_CONNECTION || path.join(ROOT, 'data/dev.sqlite3')
    }),
    test: Object.assign({}, options, {
        connection: DB_CONNECTION || path.join(ROOT, 'data/test.sqlite3')
    }),
    production: Object.assign({}, options, {
        connection: DB_CONNECTION || path.join(ROOT, 'data/prod.sqlite3')
    })
};