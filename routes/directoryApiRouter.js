const express = require('express');
const directoryRouter = express.Router();
const directoryController = require('../controllers/directoryApiController');

const urlEncodedParser = express.urlencoded({extended: false});


directoryRouter.post('/', urlEncodedParser, directoryController.create);

directoryRouter.put('/', urlEncodedParser, directoryController.update);

directoryRouter.delete('/', directoryController.delete);


module.exports = directoryRouter;