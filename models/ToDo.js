const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

       description : {
           type : String,
           required : true
       },

       category : {
           type : String,
        required : true
       },

       due_date : {
           type : String
       }

});

const todo = mongoose.model('todo' , todoSchema);

module.exports = todo;