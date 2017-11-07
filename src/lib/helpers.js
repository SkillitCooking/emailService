'use strict';

const propWithPrefix = (prefixToUse) => {
    return ((prefix, prop) => {
        return {name: prop, column: prefix + '_' + prop};
    }).bind(null, prefixToUse);
};

const getMealPlansForMailing = (mealPlans) => {
    mealPlans.forEach(mp => {
        if(mp.overview) {
            mp.hasOverview = true;
        } else {
            mp.hasOverview = false;
        }
        mp.ingredientCategories = new Map();
        mp.recipes.forEach(r => {
            r.ingredients.forEach(i => {
                //check if ingredient's category in map
                let ingredientMap = mp.ingredientCategories.get(i.category);
                if(ingredientMap) {
                    ingredientMap.set(i.id, i);
                } else {
                    let ingredientMap = new Map();
                    ingredientMap.set(i.id, i);
                    mp.ingredientCategories.set(i.category, ingredientMap);
                }
                //if not in map add, with value as associated Set
                //if in the map, then just add nameSingulars to associated Set
                //a little "short-sighted", but get to use Set, refactoring pretty easy
            });
        });
        let categoryArray = [];
        let categoryIterable = mp.ingredientCategories.entries();
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
            categoryArray.push(categoryObj);
        }
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