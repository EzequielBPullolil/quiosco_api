require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = process.env.saltRounds;
module.exports = async password =>{
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}