var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongodata', { useMongoClient: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;

