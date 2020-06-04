
const express = require("express");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-6bs-x24f.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://seat-api',
    issuer: `https://dev-6bs-x24f.auth0.com/`,
    algorithms: ['RS256']
});

module.exports = app => {
    const seat = require("./seat.controller");

    // Create a new Customer
    app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
    app.use(express.json());
    app.use(checkJwt);
    app.post("/seat", seat.create);

    // Retrieve all Customers
    app.use(checkJwt);
    app.get("/customers", seat.findAll);

    // // Retrieve a single Customer with customerId
    app.use(checkJwt);
     app.get("/seat/:id", seat.findOne);
    //
    // Update a Customer with customerId
    app.use(checkJwt);
    app.put("/seat/:id", seat.update);
    //
    // // Delete a Customer with customerId
    app.use(checkJwt);
    app.delete("/seat/:id", seat.delete);
    //
    // // Create a new Customer
    app.use(checkJwt);
    app.delete("/reset", seat.deleteAll);
};