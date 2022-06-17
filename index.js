
const fs = require('fs');
const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let sanitizer = require('sanitizer');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let mailbox = "";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.get('/box', function (req, res) {
  res.send(mailbox);
});

app.post('/mail', function (req, res) {
  let cleanUser = sanitizer.escape(req.body.user);
  let cleanMsg = sanitizer.escape(req.body.user);

  mailbox += "<span class='ugotmail'><b>" + cleanUser + ":</b>" + cleanMsg + "</span>";
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});