const express = require('express');
const path = require('path');
const app =express();

const PORT=4000;
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "../middle/build")));


app.listen(PORT,() =>{
    console.log('server start');
})

app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });