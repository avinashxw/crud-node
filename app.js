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

app.post('/', (req,res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
