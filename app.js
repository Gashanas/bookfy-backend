const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/dev', function (req, res) {
        res.send('Hello, you are now on the Dev route!');
    });