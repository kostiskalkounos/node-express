const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://kostis:kostis@cluster0.xomaa.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

app.set("view engine", "ejs"); // Register template engine
app.set("views", "views"); // Not needed, the default path is already '/views'

// Middleware is triggered by incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  // It automatically sets a cookie
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user; // mongoose object which persists across requests cause it holds data from the session
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  // For every request that is sent, these fields will be executed for the views that are rendered
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", errorController.get500);
app.use(errorController.get404);

// This middleware is executed first if there's an error passed through `next(error)`
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  res.redirect("/500");
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
