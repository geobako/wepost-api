const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        subTitle:{
            type:String,
        },
        description: {
            type: String,
            required:true
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        views: {
            type: Number,
            default:0
        },
        
    },
    { timestamps: true }
);

articleSchema.index({
    creator: 1,
});

module.exports = mongoose.model('Article', articleSchema);
