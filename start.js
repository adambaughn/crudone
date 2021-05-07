const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,    
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection
  .on('open', () => {
    alert('Mongoose connection open');
  })
  .on('error', (err) => {
    alert(`Connection error: ${err.message}`);
  });

require('./models/Registration');
const app = require('./app');

const server = app.listen(PORT, () => {
  alert(`Express is running on port ${server.address().port}`);
});
