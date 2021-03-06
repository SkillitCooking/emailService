'use strict';

const {PREFIX, TAG_TYPES, SELECT_FIELDS} = require('./constants');

function getSelectQueries(table, prefix, fields) {
    return fields.map(field => {
        if(!table) return field + ' as ' + prefix + '_' + field;
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
function addMealPlanJoins(query, isLoadTest) {
    if(isLoadTest) query.leftJoin('meal_plans', 'T.meal_plan', 'meal_plans.id');
    else query.leftJoin('meal_plans', 'meal_plan_emails.meal_plan', 'meal_plans.id');
    return query
        .leftJoin('users', 'meal_plans.user', 'users.id')
        .leftJoin('meal_plan_ingredients', 'meal_plans.id', 'meal_plan_ingredients.meal_plan')
        .leftJoin('ingredients as mp_ingredients', 'meal_plan_ingredients.ingredient', 'mp_ingredients.id')
        .leftJoin('recipe_meal_plans', 'meal_plans.id', 'recipe_meal_plans.meal_plan')
        .leftJoin('recipes', 'recipe_meal_plans.recipe', 'recipes.id')
        .leftJoin('steps', 'recipes.id', 'steps.recipe')
        .leftJoin('recipe_ingredients', 'recipes.id', 'recipe_ingredients.recipe')
        .leftJoin('ingredients', 'recipe_ingredients.ingredient', 'ingredients.id')
        .leftJoin('ingredient_tags', function() {

            this.on('ingredient_tags.ingredient', '=', 'ingredients.id');
            
        }).where('ingredient_tags.type', TAG_TYPES.CATEGORY)
        .leftJoin('tags', 'ingredient_tags.tag', 'tags.id')
        .leftJoin('recipe_seasonings', 'recipes.id', 'recipe_seasonings.recipe')
        .leftJoin('seasonings', 'recipe_seasonings.seasoning', 'seasonings.id');
}

function addMealPlanSelects(query, isLoadTest) {
    let mpeSelect;
    if(isLoadTest) mpeSelect = [];
    else mpeSelect = getSelectQueries('meal_plan_emails', PREFIX.MEAL_PLAN_EMAILS, SELECT_FIELDS.MEAL_PLAN_EMAILS);
    return query
        .select(...mpeSelect,
            ...getSelectQueries('meal_plans', PREFIX.MEAL_PLANS, SELECT_FIELDS.MEAL_PLANS),
            ...getSelectQueries('recipe_meal_plans', PREFIX.RECIPE_MEAL_PLANS, SELECT_FIELDS.RECIPE_MEAL_PLANS),
            ...getSelectQueries('mp_ingredients', PREFIX.MEAL_PLAN_INGREDIENTS, SELECT_FIELDS.MEAL_PLAN_INGREDIENTS),
            ...getSelectQueries('users', PREFIX.USERS, SELECT_FIELDS.USERS),
            ...getSelectQueries('recipes', PREFIX.RECIPES, SELECT_FIELDS.RECIPES),
            ...getSelectQueries('steps', PREFIX.STEPS, SELECT_FIELDS.STEPS),
            ...getSelectQueries('recipe_seasonings', PREFIX.RECIPE_SEASONINGS, SELECT_FIELDS.RECIPE_SEASONINGS),
            ...getSelectQueries('seasonings', PREFIX.SEASONINGS, SELECT_FIELDS.SEASONINGS),
            ...getSelectQueries('ingredients', PREFIX.INGREDIENTS, SELECT_FIELDS.INGREDIENTS),
            ...getSelectQueries('tags', PREFIX.INGREDIENT_TAGS, SELECT_FIELDS.INGREDIENT_TAGS)
        ).orderBy(PREFIX.STEPS + '_order');
}

function fetchDueMealPlans(db) {
    let current = new Date().toISOString();
    let query = db('meal_plan_emails').where('has_sent', false).where('date_to_send', '<', current);
    query = addMealPlanJoins(query);
    return addMealPlanSelects(query);
    //return db('ingredient_tags').select();
}

function fetchOneMealPlan(db) {
    let query = db.with('T', (qb) => {
        qb.select(db.raw('*, ROW_NUMBER() OVER ' +
            '(ORDER BY created_at DESC) as rn'))
            .from('meal_plan_emails');
    })
        .select(...getSelectQueries('T', PREFIX.MEAL_PLAN_EMAILS, SELECT_FIELDS.MEAL_PLAN_EMAILS.concat(['rn']))).from('T').where('T.rn', 1);
    query = addMealPlanJoins(query, true);
    return addMealPlanSelects(query, true);
}

/* ----> What about conditional selects? Joins?
    *** Join on [condition]
        ==> Basic idea: this.on(type = DELIVERY).orOn(type = REMINDER1)
        ==> But more like:
            ==> this.on(x.id = y.x).andOn(function() { this.on(type = DELIVERY); this.orOn(type = REMINDER1) })
            ==> Could probably abstract the function of the inner type... figure out some way to bind the 
                shit together such that the right number 'ons are applied', and wouldn't have to rewrite....
    *** Select CASE - multiple CASE stmts
        ==> CASE WHEN type = 'DELIVERY' THEN table.val WHEN type = 'REMINDER1' THEN table.val ELSE null END,
        ==> CASE WHEN type = 'DELIVERY' THEN table.val1 WHEN type = 'REMINDER1' THEN table.val1 ELSE null END
        ... will want to abstract this too
            =>

 */

//query expected to be loaded up with 
function fetchMealPlansAndData(query) {
    
}

module.exports = {
    fetchDueMealPlans,
    fetchOneMealPlan
};