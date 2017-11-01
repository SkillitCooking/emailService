'use strict';

const {PREFIX, MAP_IDS} = require('../lib/constants');
const {propWithPrefix} = require('../lib/helpers');

const mealPlanFields = [
    'id',
    'title',
    'overview',
    'delivery_time'
];

//necessary for mapping?
const mealPlanEmailFields = [
    'id',
    'email_type',
    'has_sent',
    'date_to_send'
];

const recipeFields = [
    'id',
    'title',
    'description',
    'total_time',
    'active_time',
    'main_image_url'
];

//add composite logic in later
const seasoningFields = [
    'id',
    'name'
];

const ingredientFields = [
    'id',
    'name_singular'
];

const ingredientTagFields = [
    'id',
    'name'
];

const stepFields = [
    'id',
    'text',
    'order'
];

const userFields = [
    'id',
    'username',
    'first_name',
    'last_name',
    'email'
];

const relationsMap = [
    {
        mapId: MAP_IDS.MEAL_PLANS,
        idProperty: 'id',
        properties: [...mealPlanFields],
        associations: [
            {name: 'user', mapId: MAP_IDS.USERS, columnPrefix: PREFIX.USERS + '_'}
        ],
        collections: [
            {name: 'recipes', mapId: MAP_IDS.RECIPES},
            {name: 'mealPlanEmails', mapId: MAP_IDS.MEAL_PLAN_EMAILS}
        ]
    },
    {
        mapId: MAP_IDS.USERS,
        idProperty: 'id',
        properties: [...userFields]
    },
    {
        mapId: MAP_IDS.MEAL_PLAN_EMAILS,
        idProperty: {name: 'id', column: PREFIX.MEAL_PLAN_EMAILS + '_id'},
        properties: [...mealPlanEmailFields.map(propWithPrefix(PREFIX.MEAL_PLAN_EMAILS))]
    },
    {
        mapId: MAP_IDS.RECIPES,
        idProperty: {name: 'id', column: PREFIX.RECIPES + '_id'},
        properties: [...recipeFields.map(propWithPrefix(PREFIX.RECIPES))],
        collections: [
            {name: 'steps', mapId: MAP_IDS.STEPS},
            {name: 'ingredients', mapId: MAP_IDS.INGREDIENTS},
            {name: 'seasonings', mapId: MAP_IDS.SEASONINGS}
        ]
    },
    {
        mapId: MAP_IDS.STEPS,
        idProperty: {name: 'id', column: PREFIX.STEPS + '_id'},
        properties: [...stepFields.map(propWithPrefix(PREFIX.STEPS))]
    },
    {
        mapId: MAP_IDS.INGREDIENTS,
        idProperty: {name: 'id', column: PREFIX.INGREDIENTS + '_id'},
        properties: [...ingredientFields.map(propWithPrefix(PREFIX.INGREDIENTS))],
        association: [
            {name: 'category', mapId: MAP_IDS.TAGS, columnPrefix: PREFIX.INGREDIENT_TAGS + '_'}
        ]
    },
    {
        mapId: MAP_IDS.INGREDIENT_TAGS,
        idProperty: {name: 'id', column: PREFIX.INGREDIENT_TAGS + '_id'},
        properties: [...ingredientTagFields.map(propWithPrefix(PREFIX.INGREDIENT_TAGS))]
    },
    {
        mapId: MAP_IDS.SEASONINGS,
        idProperty: {name: 'id', column: PREFIX.SEASONINGS + '_id'},
        properties: [...seasoningFields.map(propWithPrefix(PREFIX.SEASONINGS))]
    }
];

module.exports = {
    relationsMap
};