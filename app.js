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

// retrieve all records
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

// retrieves record by using id
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

// delete record using id
app.delete('/:id', (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`Connection ID: ${connection.threadId}`)

        connection.query('DELETE FROM books WHERE fld_id = ? ', [req.params.id], (req, rows) => {
            if(!err){
                res.send(`Success! A book has been deleted.`)
            }
            else {
                console.log(err)
            }
        })
    })
})

//create a record
app.post('', (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`Connection ID: ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO books SET ?', [params], (req,rows) => {
            if(!err){
                res.send(`Success! A book has been added.`)
            }
            else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

//update a record
app.put('', (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`Connection ID: ${connection.threadId}`)

        const {fld_name,fld_isbn,fld_status,fld_id} = req.body

        connection.query('UPDATE books SET fld_name = ?, fld_isbn = ?, fld_status = ? WHERE fld_id = ?', [fld_name,fld_isbn,fld_status,fld_id], (req,rows) => {
            if(!err){
                res.send(`Success! A book record has been updated.`)
            }
            else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
