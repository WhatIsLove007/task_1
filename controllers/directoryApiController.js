const fs = require('fs');
const path = require('path');
const checkPathExists = require('../models/checkPathExists')

const storagePath = path.join(__dirname, '../storage');


module.exports.create = (request, response) => {

   const dirName = request.body.dirname;

   if (!dirName) return response.status(400).send({message: 'No dirname'});
   
   const dirPath = path.join(storagePath, dirName);

   checkPathExists.check(dirPath)
      .then(isDirectory => {
         console.log(isDirectory);
         if (isDirectory) {
            response.status(400).send({message: 'Directory exists'});
            throw null;
         }
         return fs.promises.mkdir(dirPath);
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
   
   const oldDirName = request.body.oldDirName;
   const newDirName = request.body.newDirName;

   if (!oldDirName) return response.status(400).send({message: 'No old dirname'});

   if (!newDirName) return response.status(400).send({message: 'No new dirname'});
   
   const oldDirPath = path.join(storagePath, oldDirName);
   const newDirPath = path.join(storagePath, newDirName);

   checkPathExists.check(oldDirPath)
      .then(isDirectory => {
         if (!isDirectory) {
            response.status(400).send({message: 'Directory does not exist'});
            throw null;
         }
         return fs.promises.rename(oldDirPath, newDirPath);
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

module.exports.delete = (request, response) => {
   
   const dirName = request.query.dirname;

   if (!dirName) return response.status(400).send({message: 'No dirname'});
   
   const dirPath = path.join(storagePath, dirName);

   checkPathExists.check(dirPath)
      .then(isDirectory => {
         if (!isDirectory) {
            response.status(400).send({message: 'Directory does not exist'});
            throw null;
         }
         return fs.promises.rmdir(dirPath);
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