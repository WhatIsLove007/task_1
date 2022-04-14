const express = require('express');
const middlewareController = require('../controllers/middlewareController');

const middlewareRouter = express.Router();


middlewareRouter.use('/', middlewareController.sendMessage);


module.exports = middlewareRouter;