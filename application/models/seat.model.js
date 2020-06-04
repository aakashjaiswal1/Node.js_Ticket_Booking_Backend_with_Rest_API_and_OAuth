const sql = require("./db.js");

// constructor
const Seat = function(seat) {
    this.id = seat.id;
    this.email = seat.email;
    this.name = seat.name;
    this.booked = seat.booked;
    this.age = seat.age;
};

Seat.create = (newSeat, result) => {
    sql.query("INSERT INTO Seat SET ?", newSeat, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("booked a new seat: ", { id: res.insertId, ...newSeat });
        result(null, { id: res.insertId, ...newSeat});
    });
};

Seat.findById = (seatId, result) => {
    sql.query(`SELECT * FROM Seat WHERE id = ${seatId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found seat: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Seat.getAll = result => {
    sql.query("SELECT * FROM Seat", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Seats : ", res);
        result(null, res);
    });
};

Seat.updateById = (id, seat, result) => {
    sql.query(
        "UPDATE Seat SET email = ?, name = ?, booked = ?, age = ? WHERE id = ?",
        [seat.email, seat.name, seat.booked,seat.age, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { id: id, ...seat });
            result(null, { id: id, ...seat });
        }
    );
};

Seat.remove = (id, result) => {
    sql.query("DELETE FROM Seat WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

Seat.removeAll = result => {
    sql.query("DELETE FROM Seat", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = Seat;
