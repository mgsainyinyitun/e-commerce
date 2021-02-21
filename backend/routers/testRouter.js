import express from 'express';
import data from '../data.js';

const testRouter = express.Router();

// userRouter.get('/seed', expressAsyncHandler( async (req,res) => {
//     console.log("Connect to database ::");
//     const createdUser = await User.insertMany(data.users);
//     res.send({createdUser});
// }));

testRouter.get('/test',(req,res) =>{
    res.send({'abcd':'abcd'});
})

export default testRouter;