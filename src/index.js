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
        let mailingMealPlans = joinjs.map(results, relationsMap, lib.constants.MAP_IDS.MEAL_PLANS, lib.constants.PREFIX.MEAL_PLANS + '_');
        /**
         * To Do Next: Massage each into appropriate forms for template to then email out
         * EG category setting
         * How many emails per meal_plan currently? Should I set up the infrastructure to create a mailling for each of those?
         * ^^ Create an email for each item in mealPlanEmails array conditional on the email_type
         */
        lib.helpers.getMealPlansForMailing(mailingMealPlans);
        let promises = [];
        mailingMealPlans.forEach(mp => {
            mp.mealPlanEmails.forEach(mpe => {
                switch(mpe.email_type) {
                case lib.constants.EMAIL_TYPES.DELIVERY_READY:
                    promises
                    //where to get the user emails? mp.user.email...
                        .push(lib.mailing.sendMealPlan(lib.constants.EMAIL_TEMPLATES.DELIVERY_READY, mp, mp.user.email));
                    break;
                default:
                    break;    
                }
            });
        });
        Promise.all(promises)
            .then((res) => {
                lib.logging.info('POLLING END', res); //possibly process res dtl to make it more usable
                process.exit(0);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }).catch(err => {
        throw new Error(err);
    });
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
    process.exit(1);
}
