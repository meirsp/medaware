const db = require('./knex');
const express = require('express');

const app = express()
const port = 3000

app.get('/table/:table/columns', (req, res, next) => {
    // mysql> select column_name,data_type from information_schema.columns where table_schema = 'business' and table_name = 'DataTypeDemo';

      db.from('information_schema.columns')
        .where('table_schema', '=', process.env.MYSQL_DATABASE)
        .andWhere('table_name', '=', req.params.table)
        .select('column_name')
        .select('data_type')
        .then(rows=>{
          res.json({columns: rows})
      }).catch(e=>next(e))
  })

app.get('/tables', (req, res, next) => {
    db.from('information_schema.tables').where('table_schema', '=', process.env.MYSQL_DATABASE).select('Table_name as tablesName').then(rows=>{
        res.json({tables: rows})
    }).catch(e=>next(e))
})

app.use((err, req, res, next)=>{
    res.json({
        error: err.message
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})