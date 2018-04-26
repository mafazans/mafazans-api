import mongoose from 'mongoose';
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
	const users = await User.find();
    res.json(users);
};

exports.getUser = async (req, res) => {
	const _id = req.params._id;
	const user = await User.findOne({ _id });
    res.json(user);
};

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
    res.json(posts);
};

exports.getPost = async (req, res) => {
	const slug = req.params.slug;
	const post = await Post.findOne({ slug });
    res.json(post);
};

