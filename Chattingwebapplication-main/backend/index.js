const dotenv = require("dotenv");
const mongoose = require('mongoose');
var cors = require('cors')


const express = require('express');
const app = express();
dotenv.config({ path: './config.env' });
require('./db/connect')
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cors());

app.use(require('./routes/auth'));


const port = process.env.port;

app.listen(port, () => {
    console.log(`server is running on ${port} port`);
})
console.log("moanan")