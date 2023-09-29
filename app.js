const express = require('express');
const User = require('./userSchema');

const app = express();

const prefix = "/api/v1"

require('./connectDB');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get(`${prefix}/show/user`, async(req, res)=>{
    try {
        const user = await User.find();

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        res.status(201).json({
            success: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

app.post(`${prefix}/create/user`, async(req, res)=>{
    try {
        const {name, email, about} = req.body;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }

        user = await User.create({
            name,
            email,
            about
        });
        
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.put(`${prefix}/update/user/:id`, async(req,res)=>{
    try {
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
        }

        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(501).json({
            success:false,
            message: error.message
        })
    }
})

app.delete(`${prefix}/delete/user/:id`, async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({
            success:false,
            message: "User not found!"
        })
    }

    await user.deleteOne({_id: req.params.id});

    res.status(201).json({
        success: true,
        message: "User Deleted Successfully"
    })
})

module.exports = app;