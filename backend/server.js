// "type": "module", if import error es6
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from 'dotenv';
import orderRouter from "./routers/orderRouter.js";
// mongodb://localhost/amazona
// mongodb://127.0.0.1/my_database

dotenv.config();

const app = express();
app.use(express.json()); // add new middleware parse json
app.use(express.urlencoded({extended:true}));

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
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get("/", (req, res) => {
  res.send("Server is ready");
});


app.get('/test',(req,res) => {
  console.log("Server is able to connect:::");
  res.send({message:'Server is Ready'})
})

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
