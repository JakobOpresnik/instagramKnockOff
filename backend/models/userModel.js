var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'email' : String,
	'password' : String,
	'posts' : Number,
	'total_likes' : Number
});

/**
 * hashing user password before saving to database
 */
userSchema.pre("save", function(next) {
	var user = this;	// getting user that is being saved into the database
	bcrypt.hash(user.password, 10, function(err, hash) {	// salt - 10
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

/**
 * authenticates user by comparing his password with the hashed password in the database
 */
userSchema.statics.authenticate = function(username, password, callback) {
	User.findOne({username: username})
	.exec(function(err, user) {
		if (err) {
			return callback(err);
		}
		else if (!user) {
			var err = new Error("User not found.");
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if (result === true) {
				return callback(null, user);
			}
			else {
				return callback();
			}
		});
		 
	});
}

var User = mongoose.model('user', userSchema);
module.exports = User;
