'use strict';

const Handlebars = require('handlebars');
const {CATEGORIES, LINEBREAK} = require('./constants');

Handlebars.registerHelper('ingredientsList', function (ingredients) {
    return ingredients.reduce((str, ingredient) => {
        if (!str) return ingredient.name_singular;
        else return str + ', ' + ingredient.name_singular;
    }, '');
});

Handlebars.registerHelper('seasoningList', function (seasonings) {
    return seasonings.reduce((str, seasoning) => {
        if (!str) return seasoning.name;
        else return str + ', ' + seasoning.name;
    }, '');
});

Handlebars.registerHelper('pluralizeCategory', function(category) {
    if(category.ingredients.length > 1) {
        switch(category.name) {
            case CATEGORIES.STARCH:
                return 'starches';
            case CATEGORIES.PROTEIN:
                return 'proteins';
            default:
                return category.name;
        }
    }
    return category.name;
});

Handlebars.registerHelper('step_text', function(step) {
    let textArr = step.text.split(LINEBREAK);
    let out = '';
    textArr.forEach((text) => {
        out += '<p>' + text + '</p>';
    });
    return out;
});