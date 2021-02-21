// "type": "module", if import error es6
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
// mongodb://localhost/amazona
// mongodb://127.0.0.1/my_database

const app = express();
// mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

mongoose
  .connect(process.env.MONODB_URL || "mongodb://localhost/amazona", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     return res.send(product);
//   } else {
//     return res.status(404).send({ message: "Product Not Found" });
//   }
// });

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
