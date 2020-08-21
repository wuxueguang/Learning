const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {
  useUnifiedTopology: true
}, async (err, client) => {
  const db = client.db('wxg');
  const col = db.collection('g');

  console.log(await col.find({age: {$gt:15}}).toArray());
});