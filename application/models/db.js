var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Skycomputer@1234',
    database : 'DB1'
});
connection.connect(function(err){
    if(err) throw err;
    connection.query("select * from Seat",function(err,result){
        if(err) throw err;
        console.log(result);
    });
});
module.exports = connection;