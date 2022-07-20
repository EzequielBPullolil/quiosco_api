const express = require('express');
const userRouter = express.Router();
const CreateUser = require('src/apiServices/user/create_user')
userRouter.route('/')
    .get((req,res)=>{
        return res.sendStatus(200)
    })
    .post(async(req,res)=>{
        const user = await CreateUser(req.body);
        return res.status(201).json({
            status:'User registered',
            user: user
        });
    })


module.exports = userRouter;