const express = require("express");
const port = 8000;
const app = express();


app.use("/", require('./routes'));


app.listen(port, function (error) {
  if (error) {
    console.log("Error in running server", port);
  } else {
    console.log("Server Running Successfully");
  }
});
