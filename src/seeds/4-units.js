'use strict';

const faker = require('faker');
const config = require('../config');

const units = [
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word()
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word()
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word()
    }
];

function getUnits() {
    return units.map(u => ({
        id: u.id,
        name_singular: u.nameSingular,
        name_plural: u.namePlural
    }));
}

exports.getUnits = getUnits;

exports.seed = function(knex) {
    if(!config.env.isProd) {
        return knex('units').del()
            .then(function() {
                return knex('units').insert(getUnits());
            });
    }
};