require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require('./models/Registration');
const app = require('./app');

const server = app.listen(5000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
