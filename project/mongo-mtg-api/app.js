const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const SCHEMA = require('./SCHEMAS');

const ips = ['mongodb://10.0.3.112:27017/', 'mongodb://192.168.1.28:27017/'];

const dbUri = ips[0];
const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/mongo', router);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ error: err.message });
});

router.get('/', handleConnectionCheck);
router.get('/:db/:collection/:lang/:schema/:page', handlePage);

router.post('/:db/:collection/decks', async (req, res, next) => {
  try {
    const { db, collection } = req.params;
    const newDeck = req.body;
    if (!newDeck) {
      return res.status(400).json({ error: 'Missing deck in request body.' });
    }
    await client.connect();
    const decksCollection = client.db(db).collection(collection);
    const result = await decksCollection.insertOne(newDeck);
    if (result.acknowledged) {
      res.json({
        message: 'Deck successfully added.',
        insertedId: result.insertedId,
      });
    } else {
      res.status(500).json({ error: 'Failed to add deck.' });
    }
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

const port = 1337;

// Function to check the connection
async function handleConnectionCheck(req, res, next) {
  try {
    await client.connect();
    await client.db().admin().ping();
    res.json({ message: 'Welcome to the Titan-Magic API' });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
}

async function handlePage(req, res, next) {
  const { db, collection, lang, schema, page = 1 } = req.params;
  const { limit } = req.query;

  // Validate parameters
  if (isNaN(page) || page < 1) {
    return res
      .status(400)
      .json({ error: 'Page must be a non-negative integer.' });
  }

  const parsedLimit = limit ? parseInt(limit, 10) : 100; // Parse the limit value or use default (100)

  try {
    await client.connect();
    const selectedCollection = client.db(db).collection(collection);

    const totalDocuments = await selectedCollection.countDocuments({ lang });
    const totalPages = Math.ceil(totalDocuments / parsedLimit);
    const skipDocuments = (page - 1) * parsedLimit;

    const results = await selectedCollection
      .find({ lang })
      .sort({ _id: 1 })
      .skip(skipDocuments)
      .limit(parsedLimit)
      .toArray();

    // If no results, return message
    if (results.length === 0)
      return res.json({ message: 'No cards found for this language' });

    // Build response based on schema
    const response = buildResponse(results, schema);

    const data = {
      count: totalDocuments,
      pages: {
        total: totalPages,
        current: parseInt(page, 10),
        count: results.length,
      },
      schema,
      data: response,
    };
    res.json(data);
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
}

// Function to build response data based on schema
function buildResponse(results, schema) {
  const attributesToReturn = getAttributesToReturn(schema);
  return results.map((doc) =>
    attributesToReturn
      ? attributesToReturn.reduce((obj, attr) => {
          obj[attr] = doc[attr];
          return obj;
        }, {})
      : doc
  );
}

// Function to get attributes to return based on schema
function getAttributesToReturn(schema) {
  const availableSchemas = new Set([
    'meta',
    'play',
    'print',
    'face',
    'related',
  ]);

  if (availableSchemas.has(schema)) return SCHEMA[schema];
  if (schema) return schema.split(',');
  return null;
}

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
