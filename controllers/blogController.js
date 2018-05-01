import mongoose from 'mongoose';
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
import multer from 'multer';
import jimp from 'jimp';
import uuid from 'uuid';

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next){
		// console.log(file)
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto){
			next(null, true);
		}else {
			next({ message: 'That filetype is not allowed!' }, false);
		}
	}
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
	// console.log(req)
	if(!req.file){
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}

exports.createPost = async (req, res) => {
	req.body.author = '5aa481c24538eb0ce1484a19';
	// req.body.author = req.user._id;
	const post = await (new Post(req.body)).save();
	res.json({status: true, message: `Successfully created - ${post.title} post`});
}

exports.createComment = async (req, res) => {
	req.body.post = '5ab34c5db79ef4159c3487ba';
	const comment = await (new Comment(req.body)).save();
	res.json({status: true, message: { comment } });
}