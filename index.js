const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');

const todo = require('./models/ToDo');

const app = express();


//to create view engine using ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware functions
app.use(express.urlencoded());
//to use home.css(static file) 
app.use(express.static('assets'));



//to render the stored data from database to the browser
app.get('/',function(req,res){

    // return res.render('home',{
    //     title: "To Do App"
    // });

    todo.find({},function(err,listDB)
    {
        if(err){
            console.log('Error in displaying data');
            return;
        }

        return res.render('home',{
            title: "To Do List",
            lists : listDB
        });
    });
});

//Populating the database with the enrtries from the browser
app.post('/create-list' , function(req,res){
   
      
    
  
    todo.create({
        description : req.body.description,
        category : req.body.category,
        due_date : req.body.due_date

    }, function(err, newlist)
    {
        if(err)
        {
            console.log('Error while inserting in sathe database');
            return ;
        }

        console.log('*******',newlist);

        return res.redirect('back');
    });

});

app.get('/delete-list',function(req,res){


     //for database we will use id for deletion which is unique for every object
     console.log(req.query);  
     let id = req.query.id;

     todo.findByIdAndDelete(id,function(err){
         if(err){
             console.log('Error in deleting from DB');
             return;
         }

         return res.redirect('back');
     });


 });

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error on running server: ${err}`);
    }

    console.log(`Server running on port: ${port}`);

});