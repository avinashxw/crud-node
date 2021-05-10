const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

// declare port
const port = 4000

app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())

//mysql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud-books'
})

app.get('', (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connection ID: ${connection.threadId}`)

        connection.query('SELECT * FROM books ', (err,rows) => {
            connection.release() //return the connection ot the pool

            if(!err){
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

app.get('/:id', (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connection ID: ${connection.threadId}`)

        connection.query('SELECT * FROM books WHERE fld_id = ?',  [req.params.id], (err,rows) => {
            connection.release() //return the connection ot the pool

            if(!err){
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
