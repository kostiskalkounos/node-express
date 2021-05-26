const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// const mongodb = require("mongodb");
//
// const ObjectId = mongodb.ObjectId;
//
// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null; // convert the string into a MongoDB ObjectId
//     this.userId = userId;
//   }
//
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this }); // $set is a mongoDB operator
//     } else {
//       dbOp = db.collection("products").insertOne(this); // it's created when we insert data if it doesn't exist
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find() // find returns a handle / pointer / cursor to the documents
//       .toArray() // this should only be used if the data is small
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) }) // convert the id to an ObjectId MonogoDb uses
//       .next() // return the next and in this case the last document, we only have 1
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(() => {
//         return db.collection("users").updateOne(
//           {
//             _id: new ObjectId(userId),
//           },
//           { $pull: { "cart.items": { productId: new ObjectId(prodId) } } }
//         );
//       })
//       .then(() => {
//         console.log("Cart Item Deleted");
//       })
//       .then(() => {
//         console.log("Product Deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
//
// module.exports = Product;
