const express = require('express');
const fileApiRouter = require('./routes/fileApiRouter');
const directoryApiRouter = require('./routes/directoryApiRouter');
const middlewareRouter = require('./routes/middlewareRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');


app.use('/api/file', fileApiRouter);

app.use('/api/directory', directoryApiRouter);

app.use('/', middlewareRouter);


app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}...`));