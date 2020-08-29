module.exports = ( req, res, next ) => {
    console.log('\nIm a middleware running between your request and response\n');
    next()
}