'use strict';

//require knexfile following requiring dotenv => that way can use environment vars in knexfile accordingly
const path = require('path');
const { defaultTo } = require('lodash');
const knexfile = require('./knexfile');

const ROOT = path.resolve(__dirname, '../');
const NODE_ENV = defaultTo(process.env.NODE_ENV, 'development');
const dbClient = defaultTo(process.env.DB_CLIENT, 'sqlite3');
const LOG_TO_FILE = process.env.LOG_TO_FILE;
const postmarkApiKey = process.env.POSTMARK_API_KEY;

const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';
const isProd = NODE_ENV === 'production';
const logToFile = LOG_TO_FILE ? LOG_TO_FILE === 'true' : false;

module.exports = {
    env: {
        isDev, isTest, isProd, dbClient, logToFile, postmarkApiKey, ROOT
    },
    db: knexfile[NODE_ENV],
    data: path.join(ROOT, '/data')
};