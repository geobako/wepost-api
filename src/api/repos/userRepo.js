const User = require('../models/user.model.js');

const bcrypt = require('bcryptjs');


const findByEmail = async email => {
    let user = await User.findOne({ email })
    return user;
};

const createUser = async (email, password, name,surname) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
        email,
name,surname,
password:hashedPassword,
        password: hashedPassword,
    }).save();

    

    return newUser;
};

module.exports = {
    findByEmail,
    createUser,
   
};
