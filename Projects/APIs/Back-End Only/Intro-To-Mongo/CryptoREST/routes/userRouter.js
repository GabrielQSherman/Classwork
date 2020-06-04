const express = require('express'),

      mongoose = require('mongoose'),

      userSchema = require('../models/User'),

      router = express();

router.get('/', (req, res) => {
    res.json({
        all_users: 'http://localhost:7777/user/all',
        one_user: 'http://localhost:7777/user/<db_id>',
    })
})

router.get('/all', async (req, res) => {

    let allUsers = await userSchema.find();
    res.json({
        all_users: allUsers
    })
})


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

        res.status(200).json({
            message: 'User Found',
            user: req.foundUser
        })

})

router.delete('/:id', findUser, async (req, res) => {

    try {
        
    } catch (err) {

        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })
        
    }
    let user = req.foundUser;

    await user.remove();

    
    


})

module.exports = router;

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