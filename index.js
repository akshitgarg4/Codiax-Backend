const express = require("express");
const port = 8000;
const db=require('./config/mongoose');
const passportJWT=require('./config/passport-jwt');
const app = express();
app.use(express.urlencoded());


app.use("/", require('./routes'));


app.listen(port, function (error) {
  if (error) {
    console.log("Error in running server", port);
  } else {
    console.log("Server Running Successfully");
  }
});
