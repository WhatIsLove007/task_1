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


module.exports.update = (request, response) => {
   
   const newFileName = request.params.filename;
   const oldFileName = request.body.oldFileName;
   const fileContent = request.body.fileContent;

   if (!oldFileName) return response.status(400).send({message: 'No old filename'});

   if (!fileContent) return response.status(400).send({message: 'No file content'});

   const oldFilePath = path.join(storagePath, `${oldFileName}.txt`);
   const newFilePath = path.join(storagePath, `${newFileName}.txt`);

   checkFileExists.check(oldFilePath)
      .then(file => {
         if (!file) {
            response.status(400).send({message: 'File does not exist'});
            throw null;
         }
         return fs.promises.rename(oldFilePath, newFilePath);
      })
      .then(() => {
         return fs.promises.writeFile(newFilePath, fileContent);
      })
      .then(() => {
         response.sendStatus(200);
      })
      .catch(error => {
         if (error) {
            console.log(error);
            response.status(500).send({message: 'Server error'})
         }
      })

}


module.exports.delete = (request, response) => {

   const filename = request.query.filename;
   const filePath = path.join(storagePath, `/${filename}.txt`)

   if (!filename) return response.status(400).send({message: 'No filename'});

   checkFileExists.check(filePath)
      .then(file => {
         if (!file) {
            response.status(400).send({message: 'File does not exist'});
            throw null;
         }
         return fs.promises.unlink(filePath);
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


module.exports.get = (request, response) => {

   const fileName = request.query.filename;
   const filePath = path.join(storagePath, `/${fileName}.txt`);

   if (!fileName) return response.status(400).send({message: 'No filename'});

   checkFileExists.check(filePath)
   .then(file => {
      if (!file) {
         response.status(400).send({message: 'File does not exist'});
         throw null;
      }
      response.download(filePath);
   })
   .catch(error => {
      if (error) {
         console.log(error);
         response.status(500).send({message: 'Server error'});
      }
   })


}


module.exports.getContent = (request, response) => {

   const fileName = request.query.filename;
   const filePath = path.join(storagePath, `/${fileName}.txt`);

   if (!fileName) return response.status(400).send({message: 'No filename'});

   checkFileExists.check(filePath)
   .then(file => {
      if (!file) {
         response.status(400).send({message: 'File does not exist'});
         throw null;
      }
      return fs.promises.readFile(filePath);
   })
   .then(data => {
      fileContent = data.toString();
      response.send(fileContent);
   })
   .catch(error => {
      if (error) {
         console.log(error);
         response.status(500).send({message: 'Server error'});
      }
   })

}