const connection = require('../db');
const AppUserSchema = require('../schema/AppUserSchema');

let UserModel = connection.model('AppUser', AppUserSchema);

module.exports = UserModel;