require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Beer = require('../lib/models/Beer');

describe('routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    let beer;
    beforeEach(async() => {
        beer = await Beer.create({
            brewery: 'Deschutes',
            beerName: 'Fresh Squeezed',
            beerStyle: 'American IPA',
            abv: 6.5,
            overallScore: 4,
            aromaScore: 3.9,
            appearanceScore: 4.1,
            tasteScore: 4
        });
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('should create a new beer', () => {
        return request(app)
            .post('/api/v1/beer')
            .send({
                brewery: 'Deschutes',
                beerName: 'Fresh Squeezed',
                beerStyle: 'American IPA',
                abv: 6.5,
                overallScore: 4,
                aromaScore: 3.9,
                appearanceScore: 4.1,
                tasteScore: 4
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    brewery: 'Deschutes',
                    beerName: 'Fresh Squeezed',
                    beerStyle: 'American IPA',
                    abv: 6.5,
                    overallScore: 4,
                    aromaScore: 3.9,
                    appearanceScore: 4.1,
                    tasteScore: 4,
                    __v: 0 
                });
            });
    });

    it('should get all beers', async() => {
        return request(app)
            .get('/api/v1/beer')
            .then(res => {
                expect(res.body).toEqual([{
                    _id: expect.any(String),
                    brewery: 'Deschutes',
                    beerName: 'Fresh Squeezed',
                    beerStyle: 'American IPA',
                    abv: 6.5,
                    overallScore: 4,
                    aromaScore: 3.9,
                    appearanceScore: 4.1,
                    tasteScore: 4,
                    __v: 0
                }]);
            });
    });

    it('should update a beer', async() => {
        return request(app)
            .patch(`/api/v1/beer/${beer._id}`)
            .send({ beerName: 'Inversion', overallScore: 4.3 })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    brewery: 'Deschutes',
                    beerName: 'Inversion',
                    beerStyle: 'American IPA',
                    abv: 6.5,
                    overallScore: 4.3,
                    aromaScore: 3.9,
                    appearanceScore: 4.1,
                    tasteScore: 4,
                    __v: 0
                });
            });
    });

    it('should get a beer by id', async() => {
        return request(app)
            .get(`/api/v1/beer/${beer._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    brewery: 'Deschutes',
                    beerName: 'Fresh Squeezed',
                    beerStyle: 'American IPA',
                    abv: 6.5,
                    overallScore: 4,
                    aromaScore: 3.9,
                    appearanceScore: 4.1,
                    tasteScore: 4,
                    __v: 0
                });
            });
    });

    it('should delete a beer by id', async() => {
        return request(app)
            .delete(`/api/v1/beer/${beer._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    brewery: 'Deschutes',
                    beerName: 'Fresh Squeezed',
                    beerStyle: 'American IPA',
                    abv: 6.5,
                    overallScore: 4,
                    aromaScore: 3.9,
                    appearanceScore: 4.1,
                    tasteScore: 4,
                    __v: 0
                });
            });
    });
});
