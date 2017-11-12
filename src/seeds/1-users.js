'use strict';

const faker = require('faker');
const crypto = require('crypto');
const config = require('../config');


const users = [
    {
        username: faker.random.word(),
        id: faker.random.uuid(),
        isAdmin: false,
        email: 'dane@skillitcooking.com',
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        },
        gender: 'F',
        deliveryPreferences: {
            mealsPerWeek: faker.random.number({min: 1, max: 4}),
            minDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            maxDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            servingsPerMeal: faker.random.number({min: 1, max: 4})
        }
    },
    {
        username: faker.random.word(),
        id: faker.random.uuid(),
        isAdmin: false,
        email: 'danebratz@gmail.com',
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        },
        gender: 'M',
        deliveryPreferences: {
            mealsPerWeek: faker.random.number({min: 1, max: 4}),
            minDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            maxDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            servingsPerMeal: faker.random.number({min: 1, max: 4})
        }
    },
    {
        username: faker.random.word(),
        id: faker.random.uuid(),
        isAdmin: false,
        email: 'danebratz@gmail.com',
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        },
        gender: 'M',
        deliveryPreferences: {
            mealsPerWeek: faker.random.number({min: 1, max: 4}),
            minDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            maxDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            servingsPerMeal: faker.random.number({min: 1, max: 4})
        }
    },
    {
        username: faker.random.word(),
        id: faker.random.uuid(),
        isAdmin: false,
        email: 'dane@skillitcooking.com',
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        },
        gender: 'F',
        deliveryPreferences: {
            mealsPerWeek: faker.random.number({min: 1, max: 4}),
            minDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            maxDeliveriesPerWeek: faker.random.number({min: 1, max: 4}),
            servingsPerMeal: faker.random.number({min: 1, max: 4})
        }
    }
];

//to use them and their info elsewhere
function getUsers() {
    return users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        address_street: user.address.street,
        address_city: user.address.city,
        address_state: user.address.state,
        address_zip: user.address.zip,
        password: crypto.createHash('sha256').update(faker.internet.password(10)).digest('hex'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_admin: user.isAdmin
    }));
}

function getDeliveryPreferences() {
    return users.map(user => ({
        id: faker.random.uuid(),
        user: user.id,
        meals_per_week: user.deliveryPreferences.mealsPerWeek,
        min_deliveries_per_week: user.deliveryPreferences.minDeliveriesPerWeek,
        max_deliveries_per_week: user.deliveryPreferences.maxDeliveriesPerWeek,
        servings_per_meal: user.deliveryPreferences.servingsPerMeal
    }));
}

exports.getUsers = getUsers;

exports.seed = async function(knex) {
    if(config.env.isProd) {
        //idk what yet hurr
    } else {
        await knex('users').del();
        return knex('users').insert(getUsers()).then(() => {
            return knex('delivery_preferences').insert(getDeliveryPreferences());
        });
    }
};
