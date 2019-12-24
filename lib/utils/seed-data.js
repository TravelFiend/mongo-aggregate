const csv = require('csvtojson');
const Beer = require('../models/Beer');

function seedData(){
    return csv({ delimiter: ',' })
        .fromFile(__dirname + '/../../csv/beer_reviews.csv')
        .then(beers => {
            return beers.map(beer => ({
                brewery: beer.brewery_name,
                beerName: beer.beer_name,
                beerStyle: beer.beer_style,
                abv: beer.beer_abv,
                overallScore: beer.review_overall,
                aromaScore: beer.review_aroma,
                appearanceScore: beer.review_appearance,
                tasteScore: beer.review_taste
            }));
        })
        .then(beers => Beer.create(beers.slice(1500001, 1586615)));
}

module.exports = seedData;
