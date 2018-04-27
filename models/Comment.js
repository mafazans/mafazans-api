import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	content : {
		type: String,
		trim: true,
		required: 'You must enter your comment!'
	},
	created: {
		type: Date,
		default: Date.now
	},
	post: {
		type: mongoose.Schema.ObjectId,
		ref: 'Post',
		required: true
	}
// 	author: {
// 	type: mongoose.Schema.ObjectId,
// 	ref: 'User',
// 	required: 'You must have an author!'
// }

});

module.export = mongoose.model('Comment', commentSchema);