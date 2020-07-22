module.exports = (message, code) => {

    const newError = new Error(message);

    newError.code = code;

    return newError

}