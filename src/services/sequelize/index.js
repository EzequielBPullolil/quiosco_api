const {
    Sequelize,
	DataTypes
} = require('sequelize');
const config = require('config')
const {
    database,
    username,
    password,
    host
} = config.get('quiosco_api.dbConfig');

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres'
});

const productModel = require('./models/product')(sequelize, DataTypes);

sequelize.sync()
module.exports = {
    sequelize,
	productModel: productModel
}
