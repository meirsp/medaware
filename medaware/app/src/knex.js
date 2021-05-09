const knex = require('knex')
const options = {
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
}

const db = knex.default(options);

module.exports = db;

db.schema.hasTable('cars').then(exists=>{
    if(exists) return;
    db.schema.createTable('cars', (table) => {
        table.increments('id')
        table.string('name')
        table.integer('price')
    }).then(() => console.log("table cars created"))
})
