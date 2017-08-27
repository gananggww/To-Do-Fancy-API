const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("database conected");
  }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todos = require("./router/todos")
const users = require("./router/users")


app.use('/users', users)
app.use('/todos', todos)


app.listen(3000)
