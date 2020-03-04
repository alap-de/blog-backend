module.exports.error = (message, statusCode = 500) => {
    const err = new Error(message);
    err.statusCode = statusCode;

    return err;
}