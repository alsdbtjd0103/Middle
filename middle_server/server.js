const express = require('express');
const path = require('path');
const app =express();
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "../middle/build")));


app.listen(3000,() =>{
    console.log('server start');
})

app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });