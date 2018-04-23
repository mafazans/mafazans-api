import express from 'express';
const router = express.Router();
import apiController from '../controllers/apiController';
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users', catchErrors(apiController.getUsers));
router.get('/user/:_id', catchErrors(apiController.getUser));

router.get('/posts', catchErrors(apiController.getPosts));
router.get('/post/:slug', catchErrors(apiController.getPost));

module.exports = router;