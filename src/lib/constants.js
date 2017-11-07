'use strict';

module.exports = Object.freeze({
    PREFIX: {
        USERS: 'u',
        MEAL_PLAN_EMAILS: 'mpe',
        MEAL_PLANS: 'mp',
        RECIPES: 'r',
        STEPS: 'st',
        INGREDIENTS: 'i',
        INGREDIENT_TAGS: 'it',
        SEASONINGS: 'se'
    },
    MAP_IDS: {
        MEAL_PLANS: 'mealPlanMap',
        MEAL_PLAN_EMAILS: 'mealPlanEmailMap',
        RECIPES: 'recipeMap',
        USERS: 'userMap',
        STEPS: 'stepsMap',
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
            'main_image_url'
        ],
        SEASONINGS: [
            'id',
            'name'
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
            'order'
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
        DELIVERY_READY: 'DELIVERY_EMAIL'
    },
    EMAIL_TEMPLATES: {
        DELIVERY_READY: 'mealPlan.hbs'
    }
});