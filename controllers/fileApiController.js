const fs = require('fs');
const path = require('path');
const checkFileExists = require('../models/checkPathExists')

const storagePath = path.join(__dirname, '../storage');

module.exports.create = (request, response) => {

   const fileName = request.query.filename;
   const fileContent = request.body.fileContent;
   const filePath = path.join(storagePath, `/${fileName}.txt`);

   if (!fileName) return response.status(400).send({message: 'No file name'});

   if (!fileContent) return response.status(400).send({message: 'No file content'});

   
   checkFileExists.check(filePath)
      .then(result => {
         if (result) {
            response.status(400).send({message: 'File already exists'});
            throw null;
         };
         fs.promises.writeFile(filePath, fileContent);
      })
      .then(() => {
         response.sendStatus(200);
      })
      .catch(error => {
         if (error) {
            console.log(error);
            response.status(500).send({message: 'Server error'});
         }
      })
}


module.exports.edit = (request, response) => {
}


module.exports.delete = (request, response) => {
}


module.exports.getWhole = (request, response) => {
}


module.exports.getContent = (request, response) => {
}