'use strict';
const faker = require('faker');
const config = require('../config');

const mealPlans = require('./7-mealPlans').getMealPlans;
const utcNowStr = new Date().toISOString();


const mealPlanEmails = mealPlans().map(mp => {
    let mpe = {
        id: faker.random.uuid(),
        dateToSend: mp.delivery_time,
        emailType: 'DELIVERY_EMAIL',
        mealPlan: mp.id,
        hasSent: false 
    };
    if(Date.parse(mpe.dateToSend) < Date.parse(utcNowStr)) {
        if(faker.random.boolean()) {
            mpe.hasSent = true;
            mpe.dateSent = utcNowStr;
        }
    }
    return mpe;
});

function getMealPlanEmails() {
    return mealPlanEmails.map(mpe => ({
        id: mpe.id,
        date_to_send: mpe.dateToSend,
        email_type: mpe.emailType,
        meal_plan: mpe.mealPlan,
        has_sent: mpe.hasSent,
        date_sent: mpe.dateSent
    }));
}

exports.getMealPlanEmails = getMealPlanEmails;
exports.seed = function(){};/* exports.seed = function(knex) {
    if(!config.env.isProd) {
        return knex('meal_plan_emails').del()
            .then(() => {
                return knex('meal_plan_emails').insert(getMealPlanEmails());
            });
    }
}; */