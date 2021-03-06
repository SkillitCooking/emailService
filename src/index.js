'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const joinjs = require('join-js').default;
const relationsMap = require('./relations-map').mealPlansMap;
require('./lib/handlebarsHelpers');

require('dotenv').config({path: path.join(ROOT, 'bin/.env')});
const config = require('./config');
const lib = require('./lib');
const test = require('./test');

function sendMealPlansWithDB(db) {
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
                        lib.errors.reportError(err);
                        process.exit(1);
                    });
            })
            .catch((err) => {
                lib.errors.reportError(err);
                process.exit(1);
            });
    }).catch(err => {
        lib.errors.reportError(err);
        process.exit(1);
    });
}

try {
    //initialize knex
    lib.logging.info('POLLING START');
    const db = lib.db.initialize();
    if(config.env.isDev && process.argv.length > 2) {
        switch(process.argv[2]) {
            case 'templateTest': {
                fs.readFile(ROOT + '/src/test/mealPlan.txt', 'utf8', (err, data) => {
                    if(err) {
                        lib.logging.error('FS error: ', err);
                        process.exit(1);
                    }
                    else {
                        let mealPlans = [JSON.parse(data)];
                        lib.helpers.getMealPlansForMailing(mealPlans);
                        lib.mailing.sendMealPlan(lib.constants.EMAIL_TEMPLATES.DELIVERY_READY, mealPlans[0], 'danebratz@gmail.com')
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
                break;
            }
            
            case 'loadTest': {
                let query = lib.queries.fetchOneMealPlan(db);
                query.then(results => {
                    let mealPlan = joinjs.mapOne(results, relationsMap, lib.constants.MAP_IDS.MEAL_PLANS, lib.constants.PREFIX.MEAL_PLANS + '_');
                    lib.helpers.getMealPlansForMailing([mealPlan]);
                    //save to text as json
                    fs.writeFile(ROOT + '/src/test/mealPlan.txt', JSON.stringify(mealPlan), (err) => {
                        if(err) lib.logging.error('FS error', err);
                        process.exit(0);
                    });
                }).catch(e => {
                    console.log('error in loadTest: ', e);
                });
                break;
            }
            default:
                console.log('unrecognized argument: ', process.argv[2]);
                process.exit(0); 
        }
    } else {
        setTimeout(function() {
            sendMealPlansWithDB(db);
        }, 1000 * 60 * 15);
    }
} catch(e) {
    //handle errors
    lib.errors.reportError(e);
    process.exit(1);
}
