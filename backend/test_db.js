require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing connection to MongoDB...');
console.log('URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR: Failed to connect to MongoDB!');
    console.error(err.message);
    process.exit(1);
  });
