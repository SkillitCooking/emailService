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
    /*  test.sampleMealPlans.forEach(data => {
        promises.push(lib.mailing.sendMealPlan('mealPlan.hbs', data, 'dane@skillitcooking.com'));
    }); */
    promises.push(lib.queries.fetchDueMealPlans(db));
    Promise.all(promises).then((results) => {
        lib.logging.info('POLLING END', results);
        process.exit(0);
    }).catch(err => {
        throw new Error(err);
    });
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
    process.exit(1);
}
