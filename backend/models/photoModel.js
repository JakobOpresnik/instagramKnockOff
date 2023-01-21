var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type : Schema.Types.ObjectId,
	 	ref : 'user'
	},
	'views' : Number,
	'likes' : Number,
	'caption' : String,
	'date_time' : String,
	'publish_date' : Date,
	'tags' : Array,
	'flags' : Number	// inappropriate content flags
});

module.exports = mongoose.model('photo', photoSchema);
