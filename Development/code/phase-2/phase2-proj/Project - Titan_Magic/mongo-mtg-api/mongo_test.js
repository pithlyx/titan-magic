const { MongoClient } = require('mongodb');

hostPort = 27017;
localhost = '10.0.3.112';
const uri = `mongodb://${localhost}:${hostPort}/`;

async function testMongoDBConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db().admin().ping();
    console.log('MongoDB connection successful.');
    await client.close();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

testMongoDBConnection();
