const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ToDo_db');

const db = mongoose.connection;

db.on('error' , console.error.bind(console,'Error in Connecting DB'));

db.once('open' , function()
{
    console.log('Successfully connected to DB');
});
