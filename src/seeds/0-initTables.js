'use strict';
exports.seed = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .createTableIfNotExists('users', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('username').unique().notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.boolean('is_admin').notNullable().defaultTo(false);
            table.string('first_name').notNullable().defaultTo('DEFAULT');
            table.string('last_name').notNullable().defaultTo('DEFAULT');
            table.string('address_street').notNullable().defaultTo('DEFAULT');
            table.string('address_street2');
            table.string('address_city').notNullable().defaultTo('DEFAULT');
            table.string('address_state').notNullable().defaultTo('DEFAULT');
            table.string('address_zip').notNullable().defaultTo('DEFAULT');
            table.integer('age');
            table.string('gender');
            table.boolean('is_due_for_meal_plan').defaultTo(false);
            table.uuid('previous_meal_plan').references('meal_plans.id');
            table.timestamps(true, true);
        })
        .dropTableIfExists('delivery_preferences')
        .createTableIfNotExists('delivery_preferences', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('user').notNullable().references('users.id').onDelete('CASCADE');
            table.integer('meals_per_week').notNullable();
            table.integer('min_deliveries_per_week').notNullable();
            table.integer('max_deliveries_per_week').notNullable();
            table.integer('servings_per_meal').notNullable();
            table.timestamps(true, true);
        })
        .dropTableIfExists('seasonings')
        .createTableIfNotExists('seasonings', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('name').unique().notNullable();
            table.boolean('is_composite').defaultTo(false);
            table.timestamps(true, true);
        })
        .dropTableIfExists('tags')
        .createTableIfNotExists('tags', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('name').unique().notNullable();
            table.timestamps(true, true);
        })
        .dropTableIfExists('units')
        .createTableIfNotExists('units', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('name_singular').unique().notNullable();
            table.string('name_plural').notNullable();
            table.string('abbreviation');
            table.timestamps(true, true);
        })
        .dropTableIfExists('ingredients')
        .createTableIfNotExists('ingredients', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('name_singular').notNullable();
            table.string('store_keeping_name').notNullable().unique();
            table.string('name_plural').notNullable();
            table.string('description');
            table.boolean('is_composite').defaultTo(false);
            table.float('serving_size').defaultTo(1);
            table.uuid('units').notNullable().references('units.id').onDelete('CASCADE');
            table.float('total_size');
            table.float('est_total_price');
            table.timestamps(true, true);
        })
        .dropTableIfExists('ingredient_tags')
        .createTableIfNotExists('ingredient_tags', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('ingredient').notNullable().references('ingredients.id').onDelete('CASCADE');
            table.uuid('tag').notNullable().references('tags.id').onDelete('CASCADE');
            table.string('type').defaultTo('DEFAULT');
            table.timestamps(true, true);
            table.unique(['ingredient', 'tag']);
        })
        .dropTableIfExists('recipes')
        .createTableIfNotExists('recipes', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.string('title').unique().notNullable();
            table.string('description').notNullable();
            table.string('main_image_url').notNullable();
            table.string('main_link_url');
            table.integer('total_time');
            table.integer('active_time');
            table.timestamps(true, true);
        })
        .dropTableIfExists('steps')
        .createTableIfNotExists('steps', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('recipe').notNullable().references('recipes.id').onDelete('CASCADE');
            table.string('text').notNullable();
            table.string('main_link_url');
            table.integer('order').notNullable();
            table.timestamps(true, true);
            table.unique(['recipe', 'order']);
        })
        .dropTableIfExists('recipe_ingredients')
        .createTableIfNotExists('recipe_ingredients', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('recipe').notNullable().references('recipes.id').onDelete('CASCADE');
            table.uuid('ingredient').notNullable().references('ingredients.id').onDelete('CASCADE');
            table.boolean('is_frozen').defaultTo(false);
            table.float('proportion').defaultTo(1);
            table.unique(['recipe', 'ingredient']);
            table.timestamps(true, true);
        })
        .dropTableIfExists('recipe_seasonings')
        .createTableIfNotExists('recipe_seasonings', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('recipe').notNullable().references('recipes.id').onDelete('CASCADE');
            table.uuid('seasoning').notNullable().references('seasonings.id').onDelete('CASCADE');
            table.unique(['recipe', 'seasoning']);
            table.timestamps(true, true);
        })
        .dropTableIfExists('meal_plans')
        .createTableIfNotExists('meal_plans', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('user').notNullable().references('users.id').onDelete('CASCADE');
            table.dateTime('delivery_time').notNullable();
            table.string('delivery_timezone').notNullable();
            table.string('title');
            table.string('overview');
            table.timestamps(true, true);
        })
        .dropTableIfExists('recipe_meal_plans')
        .createTableIfNotExists('recipe_meal_plans', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('recipe').notNullable().references('recipes.id').onDelete('CASCADE');
            table.uuid('meal_plan').notNullable().references('meal_plans.id').onDelete('CASCADE');
            table.integer('order');
            table.unique(['recipe', 'meal_plan']);
            table.timestamps(true, true);
        })
        .dropTableIfExists('meal_plan_emails')
        .createTableIfNotExists('meal_plan_emails', function(table) {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('meal_plan').notNullable().references('meal_plans.id').onDelete('CASCADE');
            table.boolean('has_sent').defaultTo(false);
            table.dateTime('date_sent');
            table.dateTime('date_to_send');
            table.string('email_type');
            table.timestamps(true, true);
        });
};
