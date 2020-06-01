import * as express from "express";

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
    // app.get("/customers/:customerId", customers.findOne);
    //
    // // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
    //
    // // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
    //
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
};