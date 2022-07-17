const { Client } = require('pg')
const config = require('config')
const {
    database,
    username,
    password,
    host
} = config.get('quiosco_api.dbConfig');

module.exports = async ({barcode,name,price,photo,description})=>{
    const client = new Client({
        database,
        user:username,
        password,
        host,
        port: 5432
    })
    await client.connect()


    await client.query(`INSERT INTO products(barcode, name, price,photo, description) 
    VALUES('${barcode}','${name}',${price},'${photo}','${description}')`)
        .then((err, res) => {
            client.end()
          })

}

