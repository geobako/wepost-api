const express = require('express');
const { createArticle, getArticle, getArticles } = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth.middleware');

const ArticleRouter = express.Router();

ArticleRouter.post('/', authMiddleware, createArticle);
ArticleRouter.get('/all', getArticles);
ArticleRouter.get('/:id', getArticle);

module.exports = ArticleRouter;
