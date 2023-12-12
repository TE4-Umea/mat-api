module.exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
        ? req.headers.authorization.split(' ')
        : null;

    console.log(authHeader);
    next();
};

