const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const dbUri = `mongodb://192.168.1.28:27017/`;
const client = new MongoClient(dbUri);
const app = express();
const router = express.Router();
const MetaSchema = new mongoose.Schema({
  object: String,
  id: String,
  oracle_id: String,
  multiverse_ids: [Number],
  mtgo_id: Number,
  mtgo_foil_id: Number,
  tcgplayer_id: Number,
  cardmarket_id: Number,
  name: String,
  lang: String,
  released_at: Date,
  uri: String,
  scryfall_uri: String,
  layout: String,
  highres_image: Boolean,
  image_status: String,
  image_uris: Object,
  legalities: Object,
  games: [String],
  reserved: Boolean,
  foil: Boolean,
  nonfoil: Boolean,
  finishes: [String],
  oversized: Boolean,
  promo: Boolean,
  reprint: Boolean,
  variation: Boolean,
  set_id: String,
  set: String,
  set_name: String,
  set_type: String,
  set_uri: String,
  set_search_uri: String,
  scryfall_set_uri: String,
  rulings_uri: String,
  prints_search_uri: String,
  collector_number: String,
  digital: Boolean,
  rarity: String,
  card_back_id: String,
  artist: String,
  artist_ids: [String],
  illustration_id: String,
  border_color: String,
  frame: String,
  full_art: Boolean,
  textless: Boolean,
  booster: Boolean,
  story_spotlight: Boolean,
  edhrec_rank: Number,
  penny_rank: Number,
  prices: Object,
  related_uris: Object,
  related_cards: [String],
});

const CardSchema = new mongoose.Schema({
  object: String,
  id: String,
  oracle_id: String,
  name: String,
  mana_cost: String,
  cmc: Number,
  type_line: String,
  oracle_text: String,
  power: String,
  toughness: String,
  colors: [String],
  color_identity: [String],
  keywords: [String],
  legalities: Object,
  rarity: String,
  set: String,
  set_name: String,
  set_type: String,
  collector_number: String,
  artist: String,
  flavor_text: String,
  rulings_uri: String,
});

const PricingSchema = new mongoose.Schema({
  object: String,
  id: String,
  oracle_id: String,
  multiverse_ids: [Number],
  mtgo_id: Number,
  mtgo_foil_id: Number,
  tcgplayer_id: Number,
  cardmarket_id: Number,
  prices: Object,
  related_uris: Object,
});

const RelatedSchema = new mongoose.Schema({
  name: String,
  related_uris: Object,
});

async function listDatabases() {
  await client.connect();
  const databases = await client.db().admin().listDatabases();
  return await Promise.all(
    databases.databases.map(async (db) => {
      const collections = await client.db(db.name).listCollections().toArray();
      return { [db.name]: collections.map((col) => col.name) };
    })
  );
}

router.get('/', async (req, res, next) => {
  try {
    await client.connect();
    await client.db().admin().ping();
    res.json({ message: 'Welcome to the MongoDB API' /* ...other details */ });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

router.get('/:db/:collection/search', async (req, res, next) => {
  const { db, collection } = req.params;
  const { q, filter, schema } = req.query;
  const query = q;
  if (!query)
    return res.status(400).json({ error: 'Missing query parameter.' });

  const [value, attributeString] = query.split('|');
  const attributes = attributeString.split(',');

  try {
    await client.connect();
    const selectedCollection = client.db(db).collection(collection);

    const filterConditions = filter
      ? filter.split('|').map((f) => {
          const [key, val] = f.split(':');
          let condition =
            val === 'false' || val === '!'
              ? false
              : val === 'true' || !val
              ? true
              : val.startsWith('#')
              ? isNaN(parseFloat(val.slice(1)))
                ? val.slice(1)
                : parseFloat(val.slice(1))
              : { $regex: new RegExp(val, 'i') };
          return { [key]: condition };
        })
      : [];

    const projection = schema
      ? SCHEMA[schema]
        ? SCHEMA[schema].reduce((proj, attr) => ({ ...proj, [attr]: 1 }), {})
        : schema.split(',').reduce((proj, attr) => ({ ...proj, [attr]: 1 }), {})
      : {};

    const regexValue = new RegExp(value, 'i');
    const queries = attributes.map((attr) => ({
      $and: [{ [attr]: { $regex: regexValue } }, ...filterConditions],
    }));

    const results = [];
    const attributesCount = {};
    let totalCount = 0;
    for (const query of queries) {
      const attribute = Object.keys(query.$and[0])[0];
      const attributeCount = await selectedCollection.countDocuments(query);

      if (attributeCount > 0) {
        totalCount += attributeCount;
        attributesCount[attribute] = attributeCount;
        const attributeResults = await selectedCollection
          .find(query)
          .project(projection)
          .toArray();
        results.push(attributeResults);
      }
    }

    res.json({
      total_count: totalCount,
      keyword: value,
      attributes: attributesCount,
      results: results,
    });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

router.get('/:db/:collection/attributes/:format', async (req, res, next) => {
  const { db, collection, format } = req.params;
  // const { } = req.query;
  const MAX_VALUES = 20; // Maximum number of values per attribute

  try {
    await client.connect();
    const selectedCollection = client.db(db).collection(collection);

    const attributes = await selectedCollection
      .find()
      .limit(100)
      .project({ _id: 0 })
      .toArray();

    if (format === 'values') {
      const attributeValues = {};

      attributes.forEach((document) => {
        for (const attribute in document) {
          const attributeValue = document[attribute];
          const attributeType = typeof attributeValue;

          if (!attributeValues[attribute]) {
            attributeValues[attribute] = {
              attribute: [],
              type: attributeType,
            };
          }

          if (Array.isArray(attributeValue)) {
            attributeValue.forEach((value) => {
              if (
                attributeValues[attribute].attribute.length < MAX_VALUES &&
                !attributeValues[attribute].attribute.includes(value)
              ) {
                attributeValues[attribute].attribute.push(value);
              }
            });
          } else if (attributeType === 'string' || attributeType === 'number') {
            if (
              attributeValues[attribute].attribute.length < MAX_VALUES &&
              !attributeValues[attribute].attribute.includes(attributeValue)
            ) {
              attributeValues[attribute].attribute.push(attributeValue);
            }
          } else if (attributeType === 'boolean') {
            if (attributeValues[attribute].attribute.length < MAX_VALUES) {
              if (!attributeValues[attribute].attribute.includes(true)) {
                attributeValues[attribute].attribute.push(true);
              }
              if (!attributeValues[attribute].attribute.includes(false)) {
                attributeValues[attribute].attribute.push(false);
              }
            }
          }
        }
      });

      res.json(attributeValues);
    } else if (format === 'types') {
      const attributeTypes = {};
      const document = attributes[0];

      for (const attribute in document) {
        const attributeValue = document[attribute];
        let attributeType = typeof attributeValue;

        if (Array.isArray(attributeValue)) {
          attributeType = 'array';
        } else if (attributeType === 'object' && attributeValue !== null) {
          attributeType = 'object';
        }

        attributeTypes[attribute] = {
          attribute: attribute,
          type: attributeType,
        };
      }

      res.json(attributeTypes);
    } else {
      const attributeList = Object.keys(attributes[0]);
      res.json({ attributes: attributeList });
    }
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

app.post('/users', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    user_id: req.body.user_id,
    collections: [],
    decks: [],
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving user');
    } else {
      res.status(200).send('User saved successfully');
    }
  });
});

app.use('/api/mongo', router);
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
listDatabases()
  .then(() =>
    app.listen(1337, () => console.log(`API server listening on port 1337`))
  )
  .catch((err) =>
    console.error(
      'Failed to retrieve database and collection information:',
      err
    )
  );

// const user = {
//   username:{user parameter},
//   password:{pass parameter},
//   user_id: {unique id},
//   collections:[],
//   decks:[
//   ]
// }

// {
//       deck_name:"omnath",
//       format:"edh",
//       author:["pithlyx", 3766],
//       is_public:false,
//       stats{
//         cmc:[10,16,15,10,3],
//       },
//       cards:{
//         mainboard:{
//           commander:{id:"card_id"}
//           land:[{id:"card_id"},{id:"card_id"}],
//           instant:[{id:"card_id"},{id:"card_id"}],
//           sorcery:[{id:"card_id"},{id:"card_id"}],
//           creature:[{id:"card_id"},{id:"card_id"}],
//           artifact:[{id:"card_id"},{id:"card_id"}],
//           enchant:[{id:"card_id"},{id:"card_id"}],
//           paneswalker:[{id:"card_id"},{id:"card_id"}]
//         },
//         sideboard:{
//           land:[{id:"card_id"},{id:"card_id"}],
//           instant:[{id:"card_id"},{id:"card_id"}],
//           sorcery:[{id:"card_id"},{id:"card_id"}],
//           creature:[{id:"card_id"},{id:"card_id"}],
//           artifact:[{id:"card_id"},{id:"card_id"}],
//           enchant:[{id:"card_id"},{id:"card_id"}],
//           paneswalker:[{id:"card_id"},{id:"card_id"}]
//         }
//       }
//     }
// if user or deck is public add the id to the public db
