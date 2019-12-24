const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brewery: {
        type: String,
    },
    beerName: {
        type: String,
        required: true
    },
    beerStyle: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
    },
    overallScore: {
        type: Number,
        required: true
    },
    aromaScore: {
        type: Number,
        required: true
    },
    appearanceScore: {
        type: Number,
        required: true
    },
    tasteScore: {
        type: Number,
        required: true
    }
});

schema.statics.topTenMostBeers = function() {
    return this.aggregation([{
        '$group': {
            '_id': '$brewery',
            'totalBeers': {
                '$sum': 1
            }
        }
    }, {
        '$sort': {
            'totalBeers': -1
        }
    }, {
        '$limit': 10
    }]);
};

schema.statics.topRatedBeers = function(){
    return this.aggregation([{
        '$group': {
            '_id': '$beerStyle',
            'totalBeers': {
                '$sum': 1
            },
            'overallScore': {
                '$sum': '$overallScore'
            }
        }
    }, {
        '$addFields': {
            'averageScore': {
                '$divide': [
                    '$overallScore', '$totalBeers'
                ]
            }
        }
    }, {
        '$sort': {
            'averageScore': -1
        }
    }, {
        '$limit': 20
    }]);
};

schema.statics.strongestBeerBreweries = function(){
    return this.aggregation([{
        '$group': {
            '_id': '$brewery',
            'totalBeers': {
                '$sum': 1
            },
            'totalAbv': {
                '$sum': '$abv'
            }
        }
    }, {
        '$addFields': {
            'averageAbv': {
                '$divide': [
                    '$totalAbv', '$totalBeers'
                ]
            }
        }
    }, {
        '$sort': {
            'averageAbv': -1
        }
    }, {
        '$limit': 20
    }]);
};

module.exports = mongoose.model('Beer', schema);
