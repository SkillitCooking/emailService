'use strict';

const faker = require('faker');
const config = require('../config');

const tags = [
    {
        name: 'protein',
        id: faker.random.uuid()
    },
    {
        name: 'vegetables',
        id: faker.random.uuid()
    },
    {
        name: 'starch',
        id: faker.random.uuid()
    },
    {
        name: 'sauce/condiment',
        id: faker.random.uuid()
    }
];

function getTags() {
    return tags.map(tag => ({
        name: tag.name,
        id: tag.id
    }));
}

exports.getTags = getTags;

exports.seed = async function(knex) {
    if(!config.env.isProd) {
        await knex('tags').del();
        return knex('tags').insert(getTags());
    }
};
