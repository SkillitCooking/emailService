const faker = require('faker');
const config = require('../config');

const ingredientIds = require('./5-ingredients').getIngredients().map(i => i.id);
const seasoningIds = require('./2-seasonings').getSeasonings().map(s => s.id);

const forSureIndex = faker.random.number(ingredientIds.length - 1);

const recipes = [
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 9
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 9
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 9
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 9
            }
        ]
    },
    {
        id: faker.random.uuid(),
        title: faker.random.word(),
        description: faker.random.word(15),
        mainImageUrl: faker.image.imageUrl(),
        mainLinkUrl: faker.internet.url(),
        activeTime: faker.random.number({min: 5, max: 20}),
        totalTime: faker.random.number({min: 20, max: 60}),
        ingredients: ingredientIds.filter((i, index) => {
            if(forSureIndex === index) return true;
            else return faker.random.boolean();
        }).map(i =>({
            ingredient: i,
            isFrozen: faker.random.boolean(),
            proportion: faker.random.number({min: 0, max: 10})
        })),
        seasonings: seasoningIds.slice(0, faker.random.number({min: 1, max: seasoningIds.length - 1})),
        tags: [],
        steps: [
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 1
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 2
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 3
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 4
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 5
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 6
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 7
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 8
            },
            {
                id: faker.random.uuid(),
                text: faker.random.words(11),
                mainLinkUrl: faker.internet.url(),
                tags: [],
                order: 9
            }
        ]
    }
];

function getRecipes() {
    return recipes.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        main_image_url: r.mainImageUrl,
        main_link_url: r.mainLinkUrl,
        active_time: r.activeTime,
        total_time: r.totalTime
    }));
}

function getRecipeIngredients() {
    return recipes.map(r => {
        return r.ingredients.map(i => ({
            id: faker.random.uuid(),
            ingredient: i.ingredient,
            is_frozen: i.isFrozen,
            proportion: i.proportion,
            recipe: r.id
        }));
    })
        .reduce((flattened, ingredients) => {
            flattened.push(...ingredients);
            return flattened;
        }, []);
}

function getSteps() {
    return recipes.map(r => {
        return r.steps.map(s => ({
            id: s.id,
            order: s.order,
            text: s.text,
            recipe: r.id,
            main_link_url: s.mainLinkUrl
        }));
    })
        .reduce((flattened, steps) => {
            flattened.push(...steps);
            return flattened;
        }, []);
}

function getRecipeSeasonings() {
    let recipeSeasonings = [];
    recipes.forEach(r => {
        r.seasonings.forEach(s => {
            recipeSeasonings.push({
                id: faker.random.uuid(),
                recipe: r.id,
                seasoning: s
            });
        });
    });
    return recipeSeasonings;
}

exports.getRecipes = getRecipes;

exports.seed = function(knex) {
    if(!config.env.isProd) {
        return knex('recipes').del()
            .then(() => {
                return knex('recipes').insert(getRecipes());
            })
            .then(() => {
                return Promise.all([
                    knex('steps').insert(getSteps()),
                    knex('recipe_ingredients').insert(getRecipeIngredients()),
                    knex('recipe_seasonings').insert(getRecipeSeasonings())
                ]);
            });
    }
};