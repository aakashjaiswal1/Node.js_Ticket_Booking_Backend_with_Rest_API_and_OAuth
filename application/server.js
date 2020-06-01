const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//

//

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
   res.json({message : "Welcome to this ticket booking  app"});
});
require("./seat.routes.js")(app);

app.listen(3000,()=>{
   console.log("server is running on port 3000");
});