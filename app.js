const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs"); // Register template engine
app.set("views", "views"); // Not needed, the default path is already '/views'

// Middleware is triggered by incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

// Store User into a request to use them anywhere in the app
app.use((req, res, next) => {
  User.findById("60aedada3bcb57041e0952f1")
    .then((user) => {
      // Store the user we retrive from the database into the request
      req.user = user;
      next(); // continue with the next step if we got our user and stored it
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://kostis:kostis@cluster0.xomaa.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Kostis",
          email: "kostis@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
