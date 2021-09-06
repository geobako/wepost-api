const { CustomError, ResponseHandler, handleError } = require('../../helpers/handlers');
const articleRepo = require('../repos/articleRepo');
const { httpStatus } = require('../../helpers/errorHandling');

exports.createArticle = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = user;
        const { title, subTitle, description } = req.body;

        const article = await articleRepo.createArticle({ title, subTitle, description, id });
        const response = new ResponseHandler(httpStatus.OK, { article });
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
};

exports.getArticle = async (req, res, next) => {
    try {
        const { id } = req.params;

        let article = await articleRepo.getArticle(id);
        const response = new ResponseHandler(httpStatus.OK, { article });
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
};

exports.getArticles = async (req, res, next) => {
    try {
        let { page, creatorId } = req.query;
        if (!page) {
            page = 1;
        }
        const perPage = 10;
        const skip = (page - 1) * perPage;
        let data = await articleRepo.getArticles({ skip, limit: perPage, creatorId });
        let responseObj = {
            articles: data.articles,
            currentPage: +page,
            lastPage: data.totalPages
        };
        const response = new ResponseHandler(httpStatus.OK, responseObj);

        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
};
