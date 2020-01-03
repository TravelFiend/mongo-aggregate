const { Router } = require('express');
const Beer = require('../models/Beer');

module.exports = Router()
    .post('/', (req, res, next) => {
        Beer
            .create(req.body)
            .then(beer => res.send(beer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Beer
            .find()
            .select()
            .then(beers => res.send(beers))
            .catch(next);
    })

    .get('/mostbeers', (req, res, next) => {
        Beer
            .topTenMostBeers()
            .then(topten => res.send(topten))
            .catch(next);
    })

    .get('/toprated', (req, res, next) => {
        Beer
            .topRatedBeers()
            .then(toprated => res.send(toprated))
            .catch(next);
    })

    .get('/strongbrews', (req, res, next) => {
        Beer
            .strongestBeerBreweries()
            .then(strongest => res.send(strongest))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        Beer
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(beer => res.send(beer))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Beer
            .findById(req.params.id)
            .then(beer => res.send(beer))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Beer
            .findByIdAndDelete(req.params.id)
            .then(beer => res.send(beer))
            .catch(next);
    });
