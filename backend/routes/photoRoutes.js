var express = require('express');
var router = express.Router();
var photoController = require('../controllers/photoController.js');

var multer = require('multer');
var upload = multer({ dest: "public/images/" });

/**
 * checks if a session exists (meaning someone is logged in)
 */
function requiresLogin(req, res, next){
    if (req.session && req.session.userId) {
        return next();
    }
    else {
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

/*
 * GET
 */
router.get('/', photoController.list);
router.get('/sorted', photoController.sortByLikes);
router.get('/tags/:tag', photoController.getByTag);
router.get('/:id', photoController.show);
router.get('/like/:id', photoController.addLike);
router.get('/unlike/:id', photoController.removeLike);
router.get('/flag/:id', photoController.addFlag);

/*
 * POST
 */
router.post('/', requiresLogin, upload.single("image"), photoController.create);

/*
 * PUT
 */
router.put('/:id', photoController.update);

/*
 * DELETE
 */
router.delete('/:id', photoController.remove);

module.exports = router;
