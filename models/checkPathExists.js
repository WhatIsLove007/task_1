const fs = require('fs');
const path = require('path');

module.exports.check = async (path) => {

   const file = await fs.promises.access(path).then(() => true).catch(() => false);

   return file;

}
