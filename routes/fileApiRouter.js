const express = require('express');
const fileApiController = require('../controllers/fileApiController');

const fileApiRouter = express.Router();
const urlEncodedParser = express.urlencoded({extended: false})


fileApiRouter.post('/', urlEncodedParser, fileApiController.create);

fileApiRouter.put('/:filename', urlEncodedParser, fileApiController.update);

fileApiRouter.delete('/', fileApiController.delete);

fileApiRouter.get('/get-whole', fileApiController.getWhole);

fileApiRouter.get('/get-content', fileApiController.getContent);



module.exports = fileApiRouter;