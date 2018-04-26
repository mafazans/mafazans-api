import express from 'express';
const router = express.Router();
import apiController from '../controllers/apiController';
import blogController from '../controllers/blogController';
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users', catchErrors(apiController.getUsers));
router.get('/user/:_id', catchErrors(apiController.getUser));

router.get('/getposts', catchErrors(apiController.getPosts));
router.get('/getpost/:slug', catchErrors(apiController.getPost));

router.post('/post',
	blogController.upload,
	catchErrors(blogController.resize),
	catchErrors(blogController.createPost));

router.post('/comment', catchErrors(blogController.createComment));

module.exports = router;