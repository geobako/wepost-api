const express = require('express');

/*
import  routes
*/
const authRoutes = require('./auth.route');
const articleRoutes = require('./article.route');


/*
initialize router
*/
const router = express.Router();

/*
Use routes
*/
router.use('/auth', authRoutes);
router.use('/article', articleRoutes);

//test route
router.get('/', async (req, res) => {
   
    return res.json({ message: 'server is live' });
});

module.exports = router;
