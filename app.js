const express = require('express');
const mustache = require('mustache-express');
const bodyparser= require('body-parser');

const server= express();

const list = [{item: 'Create todo list'},
              {item: 'Pick up Drogon from the vet'} ];

const completed = [{item: 'Win gold at the Olympics'}, ];

//initialize mustache engine
server.engine("mustache", mustache());
server.set("views", "./templates");
server.set("view engine", "mustache");

//initialize body parser for the form
server.use(bodyparser.urlencoded({ extended: false }));


//get todolist

server.get("/", function(req, res){

  res.render('list', {todo: list,
                      complete: completed,
  });
});

//add a new item to the list
server.post("/new", function(req, res){

  list.push({item: req.body.newTodo});



  //re-render
  res.render('list', {todo: list,
                      complete: completed,

  });
});

server.post("/completed", function(req, res){

  completed.push({item: req.body.incomplete});



  //re-render
  res.render('list', {todo: list,
                      complete: completed,

  });
});

server.listen(3003, function(){
  console.log("Todo list booted successfully");
});
