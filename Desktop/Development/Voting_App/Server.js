const express = require('express');
const app = express();
// require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT =process.env.PORT || 3000;

app.listen(3000,() =>{
    console.log('App is listening on port 3000')
})
// gym