'use strict';
const faker = require('faker');
const config = require('../config');

const userIds = require('./1-users').getUsers().map(u => u.id);
const recipeIds = require('./6-recipes').getRecipes().map(r => r.id);

const forSureIndex = faker.random.number(recipeIds.length - 1);

const timezones = [
    'America/Los_Angeles',
    'America/Chicago',
    'America/New_York',
    'America/Denver',
    'America/Phoenix',
    'America/Anchorage',
    'Pacific/Hawaii'
];

const NUMBER_MEAL_PLANS = 50;

const mealPlans = [];

for(let i = 0; i < NUMBER_MEAL_PLANS; i++) {
    let mealPlan = {
        id: faker.random.uuid(),
        title: faker.random.words(5),
        overview: faker.lorem.paragraph(3),
        user: userIds[faker.random.number({min: 0, max: userIds.length - 1})],
        recipes: recipeIds.filter((r, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }),
        deliveryTimezone: timezones[faker.random.number(timezones.length - 1)]
    };
    if(faker.random.boolean()) {
        mealPlan.deliveryTime = faker.date.future();
    } else {
        mealPlan.deliveryTime = faker.date.past();
    }
    mealPlans.push(mealPlan);
}

function getMealPlans() {
    return mealPlans.map(mp => ({
        id: mp.id,
        user: mp.user,
        title: mp.title,
        overview: mp.overview,
        delivery_time: mp.deliveryTime,
        delivery_timezone: mp.deliveryTimezone
    }));
}

function getRecipeMealPlans() {
    let recipeMealPlans = [];
    mealPlans.forEach(mp => {
        mp.recipes.forEach(r => {
            recipeMealPlans.push({
                id: faker.random.uuid(),
                recipe: r,
                meal_plan: mp.id
            });
        });
    });
    return recipeMealPlans;
}

exports.getMealPlans = getMealPlans;
exports.seed = function(knex) {
    if(!config.env.isProd) {
        return knex('meal_plans').del()
            .then(() => {
                return knex('meal_plans').insert(getMealPlans());
            })
            .then(() => {
                return knex('recipe_meal_plans').insert(getRecipeMealPlans());
            });
    }
};
