const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotasUsuario = require('./src/routes/route-customers');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

rotasUsuario(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}/usuario`);
})