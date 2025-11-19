require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const queries = require('./queries');

app.use(cors(process.env.NODE_ENV === 'production' ? 'https://peaceperdiem.com' : ' *'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json('Hiya!  This is a peaceful API.');
});

app.get('/peaces', queries.getPeaces);

app.get('/user/:id/peaces', queries.getUserPeaces);

app.post('/peaces', queries.createPeace);

app.put('/peaces/:id', queries.updatePeace);

app.delete('/peaces/:id', queries.deletePeace);

app.post('/users', queries.insertUpdateUser);

app.get('/users/:id/loves', queries.getLovesForUser);

app.post('/loves/:id', queries.lovePeace);

app.delete('/loves/:id', queries.unlovePeace);

app.post('/flags/:id', queries.flagPeace);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});