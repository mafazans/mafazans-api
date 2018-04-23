import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import md5 from 'md5';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

import bcrypt from 'bcrypt';

const userSchema = new Schema({
	email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Enter an Email Address'
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: false,
		trim: true
	},
	admin: Boolean,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.virtual('gravatar').get(function(){
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);