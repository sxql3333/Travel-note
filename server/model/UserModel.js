const connection = require('../db');
const UserSchema = require('../schema/UserSchema');

let UserModel = connection.model('User', UserSchema);

module.exports = UserModel;