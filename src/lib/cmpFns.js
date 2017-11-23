'use strict';

const {CATEGORIES} = require('./constants');

function recipeCmpFn(recipeA, recipeB) {
    if(recipeA.order < recipeB.order) {
        return -1;
    }
    if(recipeA.order > recipeB.order) {
        return 1;
    }
    return 0;
}

function categoryCmpFn(catA, catB) {
    if(catA.name === catB.name) return 0;
    if(catA.name === CATEGORIES.PROTEIN) return -1;
    if(catB.name === CATEGORIES.PROTEIN) return 1;
    if(catA.name === CATEGORIES.PRODUCE) return -1;
    if(catB.name === CATEGORIES.PRODUCE) return 1;
    if(catA.name === CATEGORIES.STARCH) return -1;
    if(catB.name === CATEGORIES.STARCH) return 1;
    if(catA.name === CATEGORIES.EXTRAS) return -1;
    return 1;
}

function seasoningCmpFn(seaA, seaB) {
    return seaA.order - seaB.order;
}

module.exports = {
    recipeCmpFn,
    categoryCmpFn,
    seasoningCmpFn
};