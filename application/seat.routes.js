
const express = require("express");

module.exports = app => {
    const seat = require("./seat.controller");

    // Create a new Customer
    app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
    app.use(express.json());
    app.post("/seat", seat.create);

    // Retrieve all Customers
    app.get("/customers", seat.findAll);

    // // Retrieve a single Customer with customerId
     app.get("/seat/:id", seat.findOne);
    //
    // Update a Customer with customerId
    app.put("/seat/:id", seat.update);
    //
    // // Delete a Customer with customerId
    app.delete("/seat/:id", seat.delete);
    //
    // // Create a new Customer
    app.delete("/reset", seat.deleteAll);
};