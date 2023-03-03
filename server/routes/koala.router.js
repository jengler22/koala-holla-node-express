const express = require('express');
const koalaRouter = express.Router();

let koalaList = [];

// DB CONNECTION


// GET
koalaRouter.get( '/', (req, res) => {
    console.log( 'GET Request made for /koalas' );
    res.send( koalaList );
});

// POST
koalaRouter.post( '/', (req, res) => {
    console.log( 'POST request made for /koalas' );
    console.log( req.body );
    let koalaToAdd = req.body;
    koalaList.push( koalaToAdd );
    res.sendStatus(201);
});

// PUT


// DELETE
koalaRouter.delete( '/:id', (req, res) => {
    console.log( req.params.id );
    const deleteIndex = Number( req.params.id );
    koalaList = koalaList.filter( (koala, index) => index !== deleteIndex )
    res.sendStatus(200);
});




module.exports = koalaRouter;