function reg(req, res, next) {
    
    const info = req.body;

    let missing = [];

    if (info.name == undefined) {
        missing.push('name')
    } 

    if (info.email == undefined) {
        missing.push('email')
    } 

    if (info.password == undefined) {
        missing.push('password')
    } 

    if (missing.length > 0 ) {
        
        res.status(400).json({
            status: 400,
            message: 'The request was missing the following properties in the request body',
            missing_props: missing,

        })

        return
    }
    
    next()
}

module.exports = reg;