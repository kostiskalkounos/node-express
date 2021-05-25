const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs"); // Register template engine
app.set("views", "views"); // Not needed, the default path is already '/views'

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// If a User is deleted, delete the products too
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// create the appropriate tables or define relations based on models/products
sequelize
  .sync({ force: true }) // Forces the tables to be overwritten
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
