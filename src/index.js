const express = require("express");
// const cors = require("cors");
const app = express();
// app.use(cors);
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";
// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const dbName = "ShopDB";

app.get("/", function (req, res) {
  res.send("<h1>Hello !</h1>");
});
//assign cutomer details
app.route("/customer").post((req, res) => {
  (async () => {
    try {
      await client.connect(function () {
        console.log("Connected successfully to server!");
      });
      const database = client.db(dbName);

      const collection = database.collection("customer");

      const docs = {};
      docs.name = req.query.name;
      docs.mobileno = req.query.mobileno;
      docs.email = req.query.email;
      docs.city = req.query.city;
      const result = await collection.insertOne(docs);

      res.send(`${result.insertedId} Id of the document inserted.`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  })().catch((err) => console.log(err));
});
//assign product details
app.route("/product").post((req, res) => {
  (async () => {
    try {
      await client.connect(function () {
        console.log("Connected successfully to server!");
      });
      const database = client.db(dbName);

      const collection = database.collection("productsorder");

      const product = {};
      product.pname = req.query.pname;
      product.quantity = req.query.quantity;
      product.pricing = req.query.pricing;
      product.mrp = req.query.mrp;
      product.custid = req.query.custid;
      const result = await collection.insertOne(product);

      res.send(`${result.insertedId} Id of the document inserted.`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  })().catch((err) => console.log(err));
});

console.log("get lost");
app.listen(3000, function () {
  console.log("server is running");
});
