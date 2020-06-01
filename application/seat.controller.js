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
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};


// Retrieve all Customers from the database.
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
//
// // Find a single Customer with a customerId
// exports.findOne = (req, res) => {
//
// };
//
// // Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {
//
// };
//
// // Delete a Customer with the specified customerId in the request
// exports.delete = (req, res) => {
//
// };
//
// // Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
//
// };
