const User = require('../api/models/user.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.generateLoginToken = async user => {
    const token = jwt.sign(
        {
            email: user.email,
            id: user._id.toString()
        },
        keys.tokenSecret
    );
    return token;
};

exports.decodeTokenAndGetUser = async token => {
    const decoded = await jwt.verify(token, keys.tokenKey);
    const user = await User.findById(decoded.id);
    return user;
};
