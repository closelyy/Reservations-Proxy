/* eslint-disable no-console */
const express = require('express');
const Axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3004;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/reservations/', (req, res) => {
  console.log(`${req.method} request from ${req.url}`);
  Axios.get('http://localhost:3000/api/reservations/')
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(200);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
