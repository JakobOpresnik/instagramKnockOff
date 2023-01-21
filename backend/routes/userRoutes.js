var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
const { route } = require('./index.js');

/*
 * GET
 */
router.get('/', userController.list);
router.get('/:id', userController.getUser);
router.get('/logout', userController.logout);
router.get('/profile/:id', userController.profile);

/*
 * POST
 */
router.post('/', userController.register);
router.post('/login', userController.login);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
