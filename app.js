
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items= ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  let day = date.getDate();

 res.render("list", {ListTitle: day, newListItems: workItems });

});
app.post("work", function(req,res){
 let item = req.body.newItem;
 workItems.push(item);
 res.redirect("/work");
});

app.post("/", function (req, res){

  let item = req.body.newItem;

if (req.body.list === "work") {
  workItems.push(item);
  res.redirect("/work");
} else {
  items.push(item);
  res.redirect("/");

} 

});

app.get("/work", function(req, res){

  let day = date();
  res.render("list", {ListTitle:"Work List", newListItems: workItems});
});

app.get("/about", function(re, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
