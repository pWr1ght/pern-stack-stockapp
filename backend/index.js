require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const axios = require('axios')
// const ModifyDataForChart = require('../src/scripts/sortChartData');

//middleware
app.use(cors());
app.use(express.json());

const stocksRouter = require('./routes/stocks');

app.use('/', stocksRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server has started on port 5000")
});