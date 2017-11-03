'use strict';

const {PREFIX, TAG_TYPES, SELECT_FIELDS} = require('./constants');

function getSelectQueries(table, prefix, fields) {
    return fields.map(field => {
        return table + '.' + field + ' as ' + prefix + '_' + field;
    });
}

/**
 * Possible points of duplication -> could collapse same recipes, ingredients, seasonings,tags potentially
 * Becomes somewhat intricate question, then, of how to distribute effectively without
 * the nicely mapped redundancy
 * This wouldn't happen on the joins, but rather on the selects
 * @param {*} query 
 */
function addMealPlanJoins(query) {
    return query
        .leftJoin('meal_plans', 'meal_plan_emails.meal_plan', 'meal_plan.id')
        .leftJoin('users', 'meal_plans.user', 'user.id')
        .leftJoin('recipe_meal_plans', 'meal_plans.id', 'recipe_meal_plans.meal_plan')
        .leftJoin('recipes', 'recipe_meal_plans.recipe', 'recipes.id')
        .leftJoin('steps', 'recipes.id', 'step.recipe')
        .leftJoin('recipe_ingredients', 'recipes.id', 'recipe_ingredients.recipe')
        .leftJoin('ingredients', 'recipe_ingredients.ingredient', 'ingredients.id')
        .leftJoin('ingredient_tags', function() {
            this.on('ingredient_tags.ingredient', '=', 'ingredients.id')
                .andOn('ingredient_tags.type', '=', TAG_TYPES.CATEGORY);
        })
        .leftJoin('tags', 'ingredient_tags.tag', 'tags.id')
        .leftJoin('recipe_seasonings', 'recipes.id', 'recipe_seasonings.recipe')
        .leftJoin('seasonings', 'recipe_seasonings.seasoning', 'seasonings.id');
}

function addMealPlanSelects(query) {
    return query
        .select(...getSelectQueries('meal_plan_emails', PREFIX.MEAL_PLAN_EMAILS, SELECT_FIELDS.MEAL_PLAN_EMAILS),
            ...getSelectQueries('meal_plans', PREFIX.MEAL_PLANS, SELECT_FIELDS.MEAL_PLANS),
            ...getSelectQueries('users', PREFIX.USERS, SELECT_FIELDS.USERS),
            ...getSelectQueries('recipes', PREFIX.RECIPES, SELECT_FIELDS.RECIPES),
            ...getSelectQueries('steps', PREFIX.STEPS, SELECT_FIELDS.STEPS),
            ...getSelectQueries('seasonings', PREFIX.SEASONINGS, SELECT_FIELDS.SEASONINGS),
            ...getSelectQueries('ingredients', PREFIX.INGREDIENTS, SELECT_FIELDS.INGREDIENTS),
            ...getSelectQueries('tags', PREFIX.INGREDIENT_TAGS, SELECT_FIELDS.INGREDIENT_TAGS)
        );
}

function fetchDueMealPlans(db) {
    let current = new Date().toISOString();
    let query = db('meal_plan_emails').where('has_sent', false).where('date_to_send', '<', current);
    query = addMealPlanJoins(query);
    return addMealPlanSelects(query);
}

module.exports = {
    fetchDueMealPlans
};