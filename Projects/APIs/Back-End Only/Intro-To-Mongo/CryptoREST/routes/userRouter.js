const express = require('express'),

      mongoose = require('mongoose'),

      userSchema = require('../models/User'),

      router = express(),

      serverPort = require('../app').port;

//GET REQUESTS

router.get('/', (req, res) => {

    res.json({
        all_users: `http://localhost:${serverPort}/user/all`,
        one_user: `http://localhost:${serverPort}/user/<db_id>`,
    })
})

router.get('/all', async (req, res) => {

    let allUsers = await userSchema.find();
    res.json({
        all_users: allUsers
    })
})

router.get('/:id', findUser, async (req, res) => {

    res.status(200).json({
        message: 'User Found',
        user: req.foundUser
    })

})

//POST A NEW USER
router.post('/', async (req, res) => {

    try {

        const newUser = new userSchema(req.body);
        
        await newUser.save();

        res.status(201).json({
            message: 'New user created',
            user: newUser
        });

    } catch (err) {

        res.json({
            message: err.message,
            error: err,
            status: 500
        })
    }
})

//PATCH A USER
router.patch('/:id', findUser, async (req, res) => {

    try {

        const id = req.params.id;

        await userSchema.update({_id: id}, req.body);

        let updateUser = await userSchema.find({_id: id});

        res.status(201).json({
            message: 'User successfuly updated',
            update_user: updateUser
        });

    } catch (err) {

        res.json({
            message: err.message,
            error: err,
            status: 500
        })
    }
})

//DELETE A USER
router.delete('/:id', findUser, async (req, res) => {

    try {

        let user = req.foundUser;

        await userSchema.findByIdAndDelete({_id: req.params.id});

        res.status(200).json({
            message: 'User successfully deleted',
            deleted_user: user
        })

    } catch (err) {

        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })   
    }
})

//MIDDLEWARE
async function findUser(req, res, next) {

    try {

        const id = req.params.id;

        req.foundUser = await userSchema.find({_id: id});

        if (req.foundUser) {

            next()

        } else {
            res.status(404).json({
                message: 'No user found'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })
    } 
}

module.exports = router;