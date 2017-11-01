'use strict';
const testData1 = {
    things: [
        {part1: 'eat', part2: 'my shorts'},
        {part1: 'underwear?', part2: 'never'},
    ]
};

const testData2 = {
    things: [
        {part1: 'gnarly', part2: 'stoked'},
        {part1: 'whoooooa', part2: 'dood'},
    ]
};

const sampleMealPlans = [{
    hasOverview: true,
    overview: 'some sample overview',
    ingredientCategories: [
        {
            name: 'cat1',
            ingredients: [
                {nameSingular: 'ingred1'},
                {nameSingular: 'ingred2'},
                {nameSingular: 'ingred3'}
            ]
        },
        {
            name: 'cat2',
            ingredients: [
                {nameSingular: 'ingred4'},
                {nameSingular: 'ingred5'},
                {nameSingular: 'ingred6'}
            ]
        }
    ],
    recipes: [
        {
            title: 'recipe1',
            description: 'This is a samepl recipe descritption homeis',
            mainImageUrl: 'http://pngimages.net/sites/default/files/stock-png-image-38839.png',
            totalTime: 20,
            activeTime: 10,
            seasonings: [
                {name: 'Garlic Salt'},
                {name: 'Chili'}
            ],
            steps: [
                {text: 'some step'},
                {text: 'some other step'},
                {text: 'A third step!'}
            ]
        },
        {
            title: 'recipe2',
            description: 'This is a samepl recipe descritption brosss',
            mainImageUrl: 'https://i.pinimg.com/originals/5e/d2/da/5ed2daeb9f8a7d9a8a365a0ba947dd39.jpg',
            totalTime: 30,
            activeTime: 15,
            seasonings: [
                {name: 'Garlic Salties'},
                {name: 'Chili Flakse'}
            ],
            steps: [
                {text: 'some step 1'},
                {text: 'some other step 1'},
                {text: 'A third step! 1'}
            ]
        }
    ]
}];

module.exports = {
    array: [
        testData1,
        testData2
    ],
    sampleMealPlans
};