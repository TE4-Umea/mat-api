const jwt = require('jsonwebtoken');

module.exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
        ? req.headers.authorization.split(' ')
        : null;

    if (!authHeader || authHeader[0] !== 'Bearer' || !authHeader[1]) {
        return res.status(401).json({ errors: [{ 'msg': 'Improper token', value: authHeader }] });
    }

    let token = authHeader[1];
    let tokenInfo;
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(token);
        } else {
            // Access Denied
            return res.status(401).json({ errors: [{ 'msg': 'Improper token, not matching secret' }] });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: [{ 'type': err.name, 'msg': err.message }] });
    }

    req.tokenInfo = tokenInfo;

    next();
};