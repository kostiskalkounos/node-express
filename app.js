const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs"); // Register template engine
app.set("views", "views"); // Not needed, the default path is already '/views'

// Middleware is triggered by incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Store User into a request to use them anywhere in the app
//app.use((req, res, next) => {
//  User.findById("60ae56cc258f11f738293c6a") // I created that user manually in the db
//    .then((user) => {
//      // Store the user we retrive from the database into the request
//      req.user = new User(user.name, user.email, user.cart, user._id);
//      next(); // continue with the next step if we got our user and stored it
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://kostis:kostis@cluster0.xomaa.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
