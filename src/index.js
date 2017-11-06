'use strict';

const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const joinjs = require('join-js').default;
const relationsMap = require('./relations-map').mealPlansMap;

require('dotenv').config({path: path.join(ROOT, 'bin/.env')});
const config = require('./config');
const lib = require('./lib');
const test = require('./test');

try {
    //initialize knex
    lib.logging.info('POLLING START');
    const db = lib.db.initialize();
    /*  test.sampleMealPlans.forEach(data => {
        promises.push(lib.mailing.sendMealPlan('mealPlan.hbs', data, 'dane@skillitcooking.com'));
    }); */
    let query = lib.queries.fetchDueMealPlans(db);
    query.then((results) => {
        //results = joinjs.map(results, relationsMap, lib.constants.MAP_IDS.MEAL_PLANS, lib.constants.PREFIX.MEAL_PLANS + '_');
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
