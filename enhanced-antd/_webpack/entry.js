
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '../src/components'));
const entrys = {};

files.forEach(item => {
  entrys[item] = path.join(__dirname, '../src/components', item);
});

module.exports = entrys;
