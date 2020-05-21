const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);



app.get('/', (req, res) => {
    res.json({ info: 'API'});
});

app.get('/tasks', db.getTasks);
app.get('/tasks/:id', db.getTaskById)
app.post('/tasks', db.createTask)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
