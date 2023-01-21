var CommentModel = require('../models/commentModel.js');

/**
 * commentController.js
 *
 * @description :: Server-side logic for managing comments.
 */
module.exports = {

    /**
     * commentController.list()
     */
    list: function (req, res) {
        CommentModel.find(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var photoId = req.params.id;

        CommentModel.find({commentedOn: photoId}, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }
            var data = [];
            data.comments = comments;

            // sort photos by publish date
            data.comments.sort((a, b) => {
                return b.publish_date - a.publish_date;
            });

            return res.json(comments);
        });
    },

    /**
     * commentController.create()
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
        console.log(req.body.commentedOn)
        var comment = new CommentModel({
			contents : req.body.contents,
			postedBy : req.session.userId,
			commentedOn : req.body.commentedOn,
			date_time : date_time,
			publish_date : new Date()
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            return res.status(201).json(comment);
        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.contents = req.body.contents ? req.body.contents : comment.contents;
			comment.postedBy = req.body.postedBy ? req.body.postedBy : comment.postedBy;
			comment.commentedOn = req.body.commentedOn ? req.body.commentedOn : comment.commentedOn;
			comment.date_time = req.body.date_time ? req.body.date_time : comment.date_time;
			comment.publish_date = req.body.publish_date ? req.body.publish_date : comment.publish_date;
			
            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
