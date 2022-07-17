const { Client } = require('pg')
const config = require('config')
const {
    database,
    username,
    password,
    host
} = config.get('quiosco_api.dbConfig');

module.exports = async ()=>{
    const client = new Client({
        database,
        user:username,
        password,
        host,
        port: 5432
    })
    await client.connect()


    await client.query(`DELETE FROM products`)
        .then(()=>{
            client.end();
        })
}