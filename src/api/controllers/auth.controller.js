const bcrypt = require('bcryptjs');
const { generateLoginToken } = require('../../services/authServices');
const { CustomError, ResponseHandler, handleError } = require('../../helpers/handlers');
const userRepo = require('../repos/userRepo');
const { httpStatus } = require('../../helpers/errorHandling');

exports.register = async (req, res, next) => {
    try {
        const { email, password, name, surname } = req.body;
        const foundUser = await userRepo.findByEmail(email);
        if (foundUser) {
            const userExistsError = new CustomError(httpStatus.BAD_REQUEST, 'Email already exists');
            return handleError(userExistsError, res);
        } else {
            const newUser = await userRepo.createUser(email, password, name, surname);
            newUser.password = '';
            const response = new ResponseHandler(httpStatus.CREATED, { user: newUser });

            return res.status(httpStatus.CREATED).json(response);
        }
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // let loadedUser;

        const user = await userRepo.findByEmail(email);
        if (!user) {
            const userDoesNotExist = new CustomError(httpStatus.BAD_REQUEST, 'Email or password is incorrect');
            return handleError(userDoesNotExist, res);
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const wrongPasswordError = new CustomError(httpStatus.BAD_REQUEST, 'Email or password is incorrect');
            return handleError(wrongPasswordError, res);
        }

        const token = await generateLoginToken(user);

        const response = new ResponseHandler(httpStatus.OK, { token });

        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
};
