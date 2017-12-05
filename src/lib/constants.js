'use strict';

module.exports = Object.freeze({
    PREFIX: {
        USERS: 'u',
        MEAL_PLAN_EMAILS: 'mpe',
        MEAL_PLANS: 'mp',
        RECIPES: 'r',
        RECIPE_MEAL_PLANS: 'rmp',
        MEAL_PLAN_INGREDIENTS: 'mpi',
        STEPS: 'st',
        INGREDIENTS: 'i',
        INGREDIENT_TAGS: 'it',
        SEASONINGS: 'se',
        RECIPE_SEASONINGS: 'rse'
    },
    MAP_IDS: {
        MEAL_PLANS: 'mealPlanMap',
        MEAL_PLAN_EMAILS: 'mealPlanEmailMap',
        RECIPES: 'recipeMap',
        USERS: 'userMap',
        STEPS: 'stepsMap',
        MEAL_PLAN_INGREDIENTS: 'mpIngredientsMap',
        INGREDIENTS: 'ingredientsMap',
        SEASONINGS: 'seasoningsMap',
        INGREDIENT_TAGS: 'ingredientTagMap'
    },
    SELECT_FIELDS: {
        MEAL_PLAN_EMAILS: [
            'id',
            'email_type',
            'has_sent',
            'date_to_send'
        ],
        MEAL_PLANS: [
            'id',
            'title',
            'overview',
            'delivery_time'
        ],
        RECIPES: [
            'id',
            'title',
            'description',
            'total_time',
            'active_time',
            'main_image_url',
            'main_link_url'
        ],
        RECIPE_MEAL_PLANS: [
            'id',
            'order'
        ],
        MEAL_PLAN_INGREDIENTS: [
            'id',
            'name_singular'
        ],
        SEASONINGS: [
            'id',
            'name'
        ],
        RECIPE_SEASONINGS: [
            'id',
            'present_order'
        ],
        INGREDIENTS: [
            'id',
            'name_singular'
        ],
        INGREDIENT_TAGS: [
            'id',
            'name'
        ],
        STEPS: [
            'id',
            'text',
            'order',
            'main_link_url'
        ],
        USERS: [
            'id',
            'username',
            'first_name',
            'last_name',
            'email'
        ]
    },
    TAG_TYPES: {
        CATEGORY: 'CATEGORY'
    },
    EMAIL_TYPES: {
        DELIVERY_READY: 'DELIVERY_EMAIL',
        FIRST_REMINDER: 'FIRST_REMINDER',
        SECOND_REMINDER: 'SECOND_REMINDER'
    },
    EMAIL_TEMPLATES: {
        DELIVERY_READY: 'mealPlan.hbs'
    },
    CATEGORIES: {
        VEGETABLES: 'vegetables',
        PROTEIN: 'protein',
        STARCH: 'starch',
        EXTRAS: 'extras',
        PRODUCE: 'produce'
    }
});