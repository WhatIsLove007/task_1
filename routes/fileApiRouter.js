const express = require('express');
const fileApiController = require('../controllers/fileApiController');

const fileApiRouter = express.Router();
const urlEncodedParser = express.urlencoded({extended: false})


fileApiRouter.post('/', urlEncodedParser, fileApiController.create);

fileApiRouter.put('/edit', fileApiController.edit);

fileApiRouter.delete('/delete', fileApiController.delete);

fileApiRouter.get('/get-whole', fileApiController.getWhole);

fileApiRouter.get('/get-content', fileApiController.getContent);



module.exports = fileApiRouter;