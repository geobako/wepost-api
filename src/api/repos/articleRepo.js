const Article = require('../models/article.model.js');

const createArticle = async ({ title, subTitle, description, id }) => {
    const newArticle = await new Article({
        title,
        subTitle,
        description,
        creator: id
    }).save();

    return newArticle;
};

const getArticle = async (id, user) => {
    let article = await Article.findById(id)
        .populate('creator')
        .lean();

    if (user.id !== article.creator) {
        article = await Article.findByIdAndUpdate(id, { views: article.views + 1 }).lean();
    }

    return article;
};

const getArticles = async ({ skip, limit, creatorId }) => {
    const count = await Article.count();
    let total = count / limit;
    const totalPages = Math.ceil(total);

    const pipeline = [
        { $skip: skip },
        { $limit: limit },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'creator'
            }
        },
        { $unwind: '$creator' },
        {
            $project: {
                _id: 1,
                title: 1,
                subtitle: 1,
                description: 1,
                createdAt: 1,
                views: 1,
                'creator._id': 1,
                'creator.name': 1,
                'creator.surname': 1
            }
        }
    ];

    if (creatorId) {
        pipeline = [{ $match: { creator: creatorId } }, ...pipeline];
    }

    const articles = await Article.aggregate(pipeline);

    return { articles, totalPages };
};

module.exports = {
    createArticle,
    getArticle,
    getArticles
};
