const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();
const port = 4001;

const DUMMY_PRODUCTS = [];

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.listen(port, () => {
    console.log(`app listening at port hhtp://localhost:${port}`)
})