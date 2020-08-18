require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
// const pool = require("./db");
const axios = require('axios')
const path = require('path');

// const ModifyDataForChart = require('../src/scripts/sortChartData');
//middleware
app.use(cors());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

const stocksRouter = require('./routes/stocks');

app.use('/', stocksRouter);
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/public/index.html'));
// });

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server has started on port 5000")
});