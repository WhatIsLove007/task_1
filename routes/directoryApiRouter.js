const express = require('express');
const directoryRouter = express.Router();
const directoryController = require('../controllers/directoryApiController');


directoryRouter.get('/create', directoryController.create);

directoryRouter.get('/edit', directoryController.edit);

directoryRouter.get('/create', directoryController.delete);


module.exports = directoryRouter;