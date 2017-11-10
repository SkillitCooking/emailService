'use strict';

const cron = require('node-cron');

const fs = require('fs');
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
    if(process.argv.length > 2 && process.argv[2] === 'superTest') {
        cron.schedule('* * * * *', function() {
            lib.logging.info('BRRRRORORORORO');
        });
    } else 
    if(config.env.isDev && process.argv.length > 2 && process.argv[2] === 'templateTest'){
        /* let query = lib.queries.fetchOneMealPlan(db);
        query.then(results => {
            let mealPlan = joinjs.mapOne(results, relationsMap, lib.constants.MAP_IDS.MEAL_PLANS, lib.constants.PREFIX.MEAL_PLANS + '_');
            lib.helpers.getMealPlansForMailing([mealPlan]);
            //save to text as json
            fs.writeFile(ROOT + '/src/test/mealPlan.txt', JSON.stringify(mealPlan), (err) => {
                if(err) lib.logging.error('FS error', err);
                process.exit(0);
            });
        }); */
        fs.readFile(ROOT + '/src/test/mealPlan.txt', 'utf8', (err, data) => {
            if(err) lib.logging.error('FS error: ', err);
            else {
                let mealPlan = JSON.parse(data);
                lib.mailing.sendMealPlan(lib.constants.EMAIL_TEMPLATES.DELIVERY_READY, mealPlan, 'danebratz@gmail.com')
                    .then((res) => {
                        lib.logging.info('good', res);
                        process.exit(0);
                    })
                    .catch(err => {
                        lib.logging.error('err', err);
                        process.exit(1);
                    });
            }
        });
    } else {
        let query = lib.queries.fetchDueMealPlans(db);
        query.then((results) => {
            let mailingMealPlans = joinjs.map(results, relationsMap, lib.constants.MAP_IDS.MEAL_PLANS, lib.constants.PREFIX.MEAL_PLANS + '_');
            lib.helpers.getMealPlansForMailing(mailingMealPlans);
            let promises = [];
            let mpeIds = [];
            mailingMealPlans.forEach(mp => {
                mp.mealPlanEmails.forEach(mpe => {
                    mpeIds.push(mpe.id);
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
                    db('meal_plan_emails').update('has_sent', true).whereIn('id', mpeIds)
                        .then(() => {
                            lib.logging.info('POLLING END', res); //possibly process res dtl to make it more usable
                            process.exit(0);
                        })
                        .catch((err) => {
                            throw new Error(err);
                        });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }).catch(err => {
            throw new Error(err);
        });
    }
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
    process.exit(1);
}
