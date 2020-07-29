
const middle = (req, res, next) => {

    console.log('This is middleware');

    next()

    
    // if (req.body != undefined) {
    //     next()
    // } else {
    //     console.log('Alert the body is not defined!');

    //     res.send('Body was not defined')
    // }

}

module.exports = middle;