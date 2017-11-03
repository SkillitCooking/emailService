'use strict';

const faker = require('faker');
const config = require('../config');

const units = [...require('./4-units').getUnits().map(u => u.id)];
const tags = [...require('./3-tags').getTags()];

const ingredients = [
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },
    {
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    },{
        id: faker.random.uuid(),
        nameSingular: faker.random.word(),
        namePlural: faker.random.word(),
        estUnitPrice: faker.random.number({min: 1, max: 15}),
        totalSize: faker.random.number({min: 1, max: 4}),
        isComposite: false,
        servingSize: 1,
        description: faker.random.words(12),
        units: units[faker.random.number(0, units.length - 1)],
        category: tags[faker.random.number({min: 0, max: tags.length - 1})]
    }
];

function getIngredients() {
    return ingredients.map(i => ({
        id: i.id,
        name_singular: i.nameSingular,
        name_plural: i.namePlural,
        est_unit_price: i.estUnitPrice,
        total_size: i.totalSize,
        is_composite: i.isComposite,
        servingSize: i.servingSize,
        description: i.description,
        units: i.units
    }));
}

function getIngredientTags() {
    let ingredientTags = [];
    ingredients.forEach(i => {
        ingredientTags.push({
            id: faker.random.uuid(),
            ingredient: i.id,
            tag: i.category.id
        });
    });
    return ingredientTags;
}

exports.getIngredients = getIngredients;

exports.seed = function(knex) {
    if(!config.env.isProd) {
        return knex('ingredients').del()
            .then(function() {
                return knex('ingredients').insert(getIngredients());
            })
            .then(() => {
                return knex('ingredient_tags').insert(getIngredientTags());
            });
    }
};