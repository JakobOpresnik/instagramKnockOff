var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
	'contents' : String,
	'postedBy' : {
	 	type : Schema.Types.ObjectId,
	 	ref : 'user'
	},
	'commentedOn' : {
	 	type : Schema.Types.ObjectId,
	 	ref : 'photo'
	},
	'date_time' : String,
	'publish_date' : Date
});

module.exports = mongoose.model('comment', commentSchema);
