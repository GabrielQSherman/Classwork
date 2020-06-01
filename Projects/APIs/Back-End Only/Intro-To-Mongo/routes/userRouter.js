const express = require('express'),

      mongoose = require('mongoose'),

      userSchema = require('../models/User'),

      router = express();

router.post('/', async (req, res) => {

    try {

        const newUser = new userSchema(req.body);
        
        await newUser.save();

        res.status(201).json({mes: newUser});

    } catch (err) {

        res.json({
            message: err.message,
            error: err,
            status: 500
        })
        
    }


})

router.get('/:id', findUser, async (req, res) => {

    if (req.foundUser) {

        res.status(200).json({
            message: 'User Found',
            user: req.foundUser
        })

    } else {
        res.status(404).json({
            message: 'No user found'
        })
    }

    


})

module.exports = router;

async function findUser(req, res, next) {

    const id = req.params.id;

    req.foundUser = await userSchema.find({_id: id});

    next()
}