var PhotoModel = require('../models/photoModel.js');
var UserModel = require('../models/userModel.js');

const timeDecay = require('../timeDecay.js');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
        .populate("postedBy")
        .exec(function(err, photos) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting photo.",
                    error: err
                });
            }
            var data = [];
            data.photos = photos;

            // sort photos by publish date
            data.photos.sort((a, b) => {
                return b.publish_date - a.publish_date;
            });

            return res.json(photos);
        });
    },

    sortByLikes: function (req, res) {
        PhotoModel.find()
        .populate("postedBy")
        .exec(function(err, photos) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting photo.",
                    error: err
                });
            }
            var data = [];
            data.photos = photos;

            var photoLifeTime = 1500;   // in milliseconds
            for (i in data.photos) {
                console.log("time remaining: " + (new Date() - data.photos[i].publish_date));
                if (new Date() - data.photos[i].publish_date > photoLifeTime) {
                    var index = data.photos.indexOf(data.photos[i]);
                    //console.log(photos.splice(index, 1));
                }
            }
            // sort photos by number of likes
            data.photos.sort((a, b) => {
                return b.likes - a.likes;
            });

            return res.json(photos);
        });
    },

    getByTag: function(req, res) {
        PhotoModel.find({"tags": req.params.tag})
        .populate("postedBy")
        .exec(function(err, photos) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting photo.",
                    error: err
                });
            }
            var data = [];
            data.photos = photos;
            // sort photos by number of likes
            data.photos.sort((a, b) => {
                return b.likes - a.likes;
            });

            return res.json(photos);
        });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            // every time a we click on a photo, its views are incremented
            photo.views++;
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when saving photo',
                        error: err
                    });
                }
    
                return res.status(201).json(photo);
            });

            //return res.json(photo);
        });
    },

    addLike: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            // every time a we click on a photo, its views are incremented
            photo.likes++;

            // get user who posted the photo which got a like and increase the user's total like count
            UserModel.findById(photo.postedBy, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
    
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                user.total_likes++;
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating user',
                            error: err
                        });
                    }
                });
            });

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when saving photo',
                        error: err
                    });
                }
    
                return res.status(201).json(photo);
            });
        });
    },

    removeLike: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            // every time a we click on a photo, its views are incremented
            photo.likes--;

            // get user who posted the photo which got a like removed and decrease the user's total like count
            UserModel.findById(photo.postedBy, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
    
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }

                user.total_likes--;
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating user',
                            error: err
                        });
                    }
                });
            });

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when saving photo',
                        error: err
                    });
                }
    
                return res.status(201).json(photo);
            });
        });
    },

    addFlag: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            // every time a flag a photo, its flags number is increased
            photo.flags++;
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when saving photo',
                        error: err
                    });
                }
    
                return res.status(201).json(photo);
            });
        });
    },


    /**
     * photoController.create()
     */
    create: function (req, res) {
        var date = new Date();
        var weekday, day, month, hour, minute, second;
        switch (date.getDay()) {
            case 0:
                weekday = "Sun";
                break;
            case 1:
                weekday = "Mon";
                break;
            case 2:
                weekday = "Tue";
                break;
            case 3:
                weekday = "Wed";
                break;
            case 4:
                weekday = "Thu";
                break;
            case 5:
                weekday = "Fri";
                break;
            case 6:
                weekday = "Sat";
                break;
            default:
                weekday = "undefined";
                break;
        }

        switch (date.getMonth()) {
            case 0:
                month = "Jan";
                break;
            case 1:
                month = "Feb";
                break;
            case 2:
                month = "Mar";
                break;
            case 3:
                month = "Apr";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "Jun";
                break;
            case 6:
                month = "Jul";
                break;
            case 7:
                month = "Aug";
                break;
            case 8:
                month = "Sep";
                break;
            case 9:
                month = "Oct";
                break;
            case 10:
                month = "Nov";
                break;
            case 11:
                month = "Dec";
                break;
        }

        if (date.getDate() < 10) {
            day = "0" + date.getDate();
        }
        else {
            day = date.getDate();
        }

        if (date.getHours() < 10) {
            hour = "0" + date.getHours();
        }
        else {
            hour = date.getHours();
        }

        if (date.getMinutes() < 10) {
            minute = "0" + date.getMinutes();
        }
        else {
            minute = date.getMinutes();
        }

        if (date.getSeconds() < 10) {
            second = "0" + date.getSeconds();
        }
        else {
            second = date.getSeconds();
        }
        
        var date_time = weekday + " " + month + " " + day + " " + date.getFullYear() + "  " + hour + ":" + minute + ":" + second;

        console.log("tags: " + req.body.tags);
        // split tags on space
        const tagsArray = req.body.tags.split(" ");

        var photo = new PhotoModel({
			name : req.body.name,
			path : "/images/" + req.file.filename,
			postedBy : req.session.userId,
			views : 0,
			likes : 0,
            caption : req.body.caption,
            date_time : date_time,
            publish_date : new Date(),
            tags : tagsArray,
            flags : 0
        });

        // get user who posted the photo and increase the number of his posts
        UserModel.findById(req.session.userId, function(err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.posts++;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user',
                        error: err
                    });
                }
            });

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating photo',
                        error: err
                    });
                }
    
                return res.status(201).json(photo);
            });
        });        
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
			photo.path = req.body.path ? req.body.path : photo.path;
			photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
			photo.views = req.body.views ? req.body.views : photo.views;
			photo.likes = req.body.likes ? req.body.likes : photo.likes;
			
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
