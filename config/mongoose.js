const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codiax');
const db=mongoose.connection;


db.on('error',console.error.bind(console,"Error in connecting with db"));
db.once('open',function(){
    console.log("Successful connection with db");
})

module.exports=db;