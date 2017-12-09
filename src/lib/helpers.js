'use strict';

const {CATEGORIES} = require('./constants');
const {recipeCmpFn, categoryCmpFn, seasoningCmpFn} = require('./cmpFns');

const propWithPrefix = (prefixToUse) => {
    return ((prefix, prop) => {
        return {name: prop, column: prefix + '_' + prop};
    }).bind(null, prefixToUse);
};

function getDisplayCategory(category) {
    switch(category) {
        case CATEGORIES.VEGETABLES:
            return CATEGORIES.PRODUCE;
        case CATEGORIES.PROTEIN:
        case CATEGORIES.PRODUCE:
        case CATEGORIES.STARCH:
            return category;
        default:
            return CATEGORIES.EXTRAS;
    }
}

const getMealPlansForMailing = (mealPlans) => {
    mealPlans.forEach(mp => {
        if(mp.overview) {
            mp.hasOverview = true;
        } else {
            mp.hasOverview = false;
        }
        mp.ingredientCategories = new Map();
        mp.recipes.sort(recipeCmpFn);
        mp.recipes.forEach(r => {
            r.seasonings.sort(seasoningCmpFn);
            r.ingredients.forEach(i => {
                //check if ingredient's category in map
                let displayCategory = getDisplayCategory(i.category);
                let ingredientMap = mp.ingredientCategories.get(displayCategory);
                if(ingredientMap) {
                    ingredientMap.set(i.id, i);
                } else {
                    let ingredientMap = new Map();
                    ingredientMap.set(i.id, i);
                    mp.ingredientCategories.set(displayCategory, ingredientMap);
                }
                //if not in map add, with value as associated Set
                //if in the map, then just add nameSingulars to associated Set
                //a little "short-sighted", but get to use Set, refactoring pretty easy
            });
        });
        let categoryArray = [];
        let categoryIterable = mp.ingredientCategories.entries();
        let hasExtras = false;
        for(let entry of categoryIterable) {
            let categoryObj = {
                name: entry[0],
                ingredients: []
            };
            let ingredientMap = entry[1];
            let ingredientMapEntries = ingredientMap.entries();
            for(let imEntry of ingredientMapEntries) {
                categoryObj.ingredients.push(imEntry[1]);
            }
            if(categoryObj.name === CATEGORIES.EXTRAS) {
                //then push meal plan ingredients
                if(mp.ingredients && mp.ingredients.length > 0) {
                    categoryObj.ingredients.push(...mp.ingredients);
                }
                hasExtras = true;
            }
            categoryArray.push(categoryObj);
        }
        if(!hasExtras && mp.ingredients && mp.ingredients.length > 0) {
            categoryArray.push({
                name: CATEGORIES.EXTRAS,
                ingredients: [...mp.ingredients]
            });
        }
        categoryArray.sort(categoryCmpFn);
        mp.ingredientCategories = categoryArray;
    });
};

/**
 * Issue: adding each ingredient category exactly once; adding category only if needed
 * Basic strategy: 
 *  -- use Set for category.ingredients initially -> how to get equality comparator on
 *  desired property (id)?
 *      -->Will then have to turn each back into array at end
 *  -- use Array for categories -> just search for extant before adding? Or use Map, rather...
 *      --> then just output iterable
 */

module.exports = {
    propWithPrefix,
    getMealPlansForMailing
};