const express = require('express');
const engine = require('ejs-mate');
const path = require('path');

const app = express();

//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//Routes
require('./routes/index');

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});