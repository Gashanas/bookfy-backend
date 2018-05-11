var express = require('express');
var router = express.Router();

const pg = require('pg');
const path = require('path');
// const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres';
const connectionString = process.env.DATABASE_URL || 'postgres://szxdlmfkqhdcfv:e597d29f6b9a05f20933ef93adfaaa3aea0b0f2972bd74f3687d5484d6ea2f8f@ec2-54-163-240-54.compute-1.amazonaws.com:5432/d1oc2i36h8pqu5?ssl=true';
//    connectionString =                             "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*"


router.post('/api/v1/book', (req, res, next) => {
    const results = [];
    // Grab data from http request
    if (req.body.volumeInfo) {
        const data = req.body.volumeInfo;
        // data.pageCount = parseInt(data.pageCount);
        console.log(data.allowAnonLogging);
        // Get a Postgres client from the connection
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                return res.status(500).json({success: false, message: err});
            }
            client.query('INSERT INTO books (title, description, authors, "pageCount", "smallThumbnail", thumbnail, "publishedDate", bookid) ' +
            'values ($1, $2, $3, $4, $5, $6, $7, $8)',
            [data.title, data.description, data.authors, data.pageCount, data.imageLinks.smallThumbnail, data.imageLinks.thumbnail, data.publishedDate, req.body.id]);
            getAllBooksAndReturn(client, res);
        });
    } else {
        return res.status(400).json({success: false, message: "Please provide book information"})
    }
});

router.get('/api/v1/books', (req, res, next) => {
    const results = [];
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            return res.status(500).json({success: false, message: err});
        }
        getAllBooksAndReturn(client, res);
    });
});

router.delete('/api/v1/book/:todo_id', (req, res, next) => {
    const results = [];
    if(!req.params.todo_id){
        return res.status(400).json({success: false, message: "Please provide book id"});
    } else {
        const id = req.params.todo_id;
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                return res.status(500).json({success: false, message: err});
            }
            client.query('DELETE FROM books WHERE bookid=($1)', [id]);
            getAllBooksAndReturn(client, res);
        });
    }
});

router.put('/api/v1/book/:todo_id', (req, res, next) => {
    const results = [];
const data = req.body.volumeInfo;
if(!req.params.todo_id){
    return res.status(400).json({success: false, message: "Please provide book id"});
} else {
    const id = req.params.todo_id;
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            return res.status(500).json({success: false, message: err});
        }
        client.query('UPDATE books SET  title=($1) WHERE bookid=($2)', [data.title,id]);
    getAllBooksAndReturn(client, res);
});
}
});

function getAllBooksAndReturn(client, res) {
    const results = [];
    client.query('SELECT * FROM books', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            results.push(row);
        }
    })
        .then(() => {
            return res.json(results);
        })
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
