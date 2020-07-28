const cookie = require('cookie')

module.exports = (req, res, next) => {

    const parsed = cookie.parse(req.headers.cookie);

    const token = parsed.token;

    req.authKey = token;

    next()
}