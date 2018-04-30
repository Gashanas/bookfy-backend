var express = require('express');
var router = express.Router();

const pg = require('pg');
const path = require('path');
// const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres';
const connectionString = process.env.DATABASE_URL || 'postgres://szxdlmfkqhdcfv:e597d29f6b9a05f20933ef93adfaaa3aea0b0f2972bd74f3687d5484d6ea2f8f@ec2-54-163-240-54.compute-1.amazonaws.com:5432/d1oc2i36h8pqu5?ssl=true';
//    connectionString =                             "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*"

/* GET home page. */
router.post('/api/v1/books', (req, res, next) => {
    const results = [];
    // Grab data from http request
    console.log(req.body.test, 'DATA1');
    console.log(req.body, 'DATA2');
    console.log(req.params, 'DATA3');
    if (req.body.title) {
        const data = req.body;
        // res.send('hi');
        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
            // console.log(req, 'data');
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, message: err});
            }
            // SQL Query > Insert Data
            const value = 'test3';
            client.query('INSERT INTO books (title) values ($1)', [data.title]);
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM books', (err, res) => {
                if (err) throw err;
                resp = res.rows;
            });
            // // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            // query.on('end', () => {
            // res.send({ title: 'Express' });
            done();
            return res.json(results);
            // });
        });
    } else {
        return res.status(400).json({success: false, data: "Please provide book information"})
    }
});

router.get('/api/v1/todos', (req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM items ORDER BY id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

// router.get('/api/v1/todos', (req, res, next) => {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, (err, client, done) => {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query('SELECT * FROM items ORDER BY id ASC;');
//         // Stream results back one row at a time
//         query.on('row', (row) => {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', () => {
//             done();
//             return res.json(results);
//         });
//     });
// });
//
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
