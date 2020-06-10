const Seat = require("./models/seat.model");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("seat controller.js debug "+req.name);

    // Create a Seat
    const seat = new Seat({
        id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        booked: req.body.booked,
        age: req.body.age
    });

    // Save Customer in the database
    Seat.create(seat, (err, data) => {

        if (err){
            if(err.toString()==="forbidden index"){
                res.status(403).send({
                    message:
                         "Forbidden Insert id"
                });
            }
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        }
        else res.send(data);
    });
};


// Retrieve all Customers from the database.
exports.findOne = (req, res) => {
    Seat.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findAll = (req, res) => {
    Seat.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    console.log("debug id of put id = "+ req.params.id);

    if (!req.body) {
        console.log("request body empty");
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Seat.updateById(
        req.params.id,
        new Seat(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Seat.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.id
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};
//
// // Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Seat.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};
