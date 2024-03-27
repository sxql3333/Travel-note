const connection = require('../db');
const TravelSchema = require('../schema/TravelSchema');

let TravelModel = connection.model('Travel', TravelSchema);

module.exports = TravelModel;