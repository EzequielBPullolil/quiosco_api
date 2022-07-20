const express = require('express');
const userRouter = express.Router();

userRouter.route('/')
    .get((req,res)=>{
        return res.sendStatus(200)
    })


module.exports = userRouter;