
const express = require('express');

const app = express();

const port = 3000;

app.get('/domain', (req, res) => {
  res.cookie('domain1', 'wwwwwwxxxxxxgggggg', {domain: '.wxg.com'});
  res.cookie('domain2', 'wwwwwwxxxxxxgggggg', {domain: '.www.wxg.com'});
  res.cookie('domain3', 'wwwwwwxxxxxxgggggg', {domain: '.test.wxg.com'});
  res.send('Hello Dimain!');
});

app.get('/path', (req, res) => {
  res.cookie('path1', 'wwwwwwxxxxxxgggggg', {path: '/ask'});
  res.cookie('path2', 'wwwwwwxxxxxxgggggg', {path: '/domain'});
  res.cookie('path3', 'wwwwwwxxxxxxgggggg', {path: '/path'});
  res.send('Hello Path!');
});

// app.get('/path', (req, res) => {
//   res.cookie('wxg___test2343', 'wwwwwwxxxxxxgggggg', {domain: 'wxg.com', path: '/test'});
//   res.send('Hello Test!');
// });

app.get('/ask', (req, res) => {
  res.send('Hello Ask!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});