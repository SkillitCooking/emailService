'use strict';

const {PREFIX, MAP_IDS, SELECT_FIELDS} = require('../lib/constants');
const {propWithPrefix} = require('../lib/helpers');

const relationsMap = [
    {
        mapId: MAP_IDS.MEAL_PLANS,
        idProperty: 'id',
        properties: [...SELECT_FIELDS.MEAL_PLANS],
        associations: [
            {name: 'user', mapId: MAP_IDS.USERS, columnPrefix: PREFIX.USERS + '_'}
        ],
        collections: [
            {name: 'recipes', mapId: MAP_IDS.RECIPES},
            {name: 'ingredients', mapId: MAP_IDS.MEAL_PLAN_INGREDIENTS},
            {name: 'mealPlanEmails', mapId: MAP_IDS.MEAL_PLAN_EMAILS}
        ]
    },
    {
        mapId: MAP_IDS.USERS,
        idProperty: 'id',
        properties: [...SELECT_FIELDS.USERS]
    },
    {
        mapId: MAP_IDS.MEAL_PLAN_EMAILS,
        idProperty: {name: 'id', column: PREFIX.MEAL_PLAN_EMAILS + '_id'},
        properties: [...SELECT_FIELDS.MEAL_PLAN_EMAILS.map(propWithPrefix(PREFIX.MEAL_PLAN_EMAILS))]
    },
    {
        mapId: MAP_IDS.RECIPES,
        idProperty: {name: 'id', column: PREFIX.RECIPES + '_id'},
        properties: [...SELECT_FIELDS.RECIPES.map(propWithPrefix(PREFIX.RECIPES)),
            {name: 'order', column: PREFIX.RECIPE_MEAL_PLANS + '_order'}
        ],
        collections: [
            {name: 'steps', mapId: MAP_IDS.STEPS},
            {name: 'ingredients', mapId: MAP_IDS.INGREDIENTS},
            {name: 'seasonings', mapId: MAP_IDS.SEASONINGS}
        ]
    },
    {
        mapId: MAP_IDS.MEAL_PLAN_INGREDIENTS,
        idProperty: {name: 'id', column: PREFIX.MEAL_PLAN_INGREDIENTS + '_id'},
        properties: [...SELECT_FIELDS.MEAL_PLAN_INGREDIENTS.map(propWithPrefix(PREFIX.MEAL_PLAN_INGREDIENTS))]
    },
    {
        mapId: MAP_IDS.STEPS,
        idProperty: {name: 'id', column: PREFIX.STEPS + '_id'},
        properties: [...SELECT_FIELDS.STEPS.map(propWithPrefix(PREFIX.STEPS))]
    },
    {
        mapId: MAP_IDS.INGREDIENTS,
        idProperty: {name: 'id', column: PREFIX.INGREDIENTS + '_id'},
        properties: [...SELECT_FIELDS.INGREDIENTS.map(propWithPrefix(PREFIX.INGREDIENTS)),
            {name: 'category', column: PREFIX.INGREDIENT_TAGS + '_name'}
        ]
    },
    {
        mapId: MAP_IDS.INGREDIENT_TAGS,
        idProperty: {name: 'id', column: PREFIX.INGREDIENT_TAGS + '_id'},
        properties: [...SELECT_FIELDS.INGREDIENT_TAGS.map(propWithPrefix(PREFIX.INGREDIENT_TAGS))]
    },
    {
        mapId: MAP_IDS.SEASONINGS,
        idProperty: {name: 'id', column: PREFIX.SEASONINGS + '_id'},
        properties: [...SELECT_FIELDS.SEASONINGS.map(propWithPrefix(PREFIX.SEASONINGS)),
            {name: 'order', column: PREFIX.RECIPE_SEASONINGS + '_present_order'}
        ]
    }
];

module.exports = {
    relationsMap
};