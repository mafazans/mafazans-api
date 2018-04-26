import mongoose from 'mongoose';
import slug from 'slug';

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: `Your post must have a title!`
	},
	content: {
		type: String,
		trim: true,
		required: 'You must enter the content!'
	},
	photo: {
		type: String,
		required: 'Please upload a photo for your post!'
	},
	tags: [String],
	slug: String,
	created: {
		type: Date,
		default: Date.now
	},
	// author: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// 	required: 'You must have an author!'
	// }
});

postSchema.index({
	title: 'text',
	content: 'text'
});

postSchema.pre('save', async function(next){
	if(!this.isModified('title')){
		next();
		return;
	}
	this.slug = slug(this.title);

	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');
	const postWithSlug = await this.constructor.find({ slug: slugRegEx });
	if(postWithSlug.length){
		this.slug = `${this.slug}-${postWithSlug.length + 1}`;
	}
	next();
});

module.export = mongoose.model('Post', postSchema);