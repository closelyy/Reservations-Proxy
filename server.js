/* eslint-disable no-console */
const express = require('express');
const Axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3004;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

const indexPath = path.join(__dirname, 'public/index.html');

app.get('/businesses/:id', (req, res) => {
  console.log(indexPath);
  res.sendFile(indexPath);
});

app.get('/api/reservations/', (req, res) => {
  console.log(`${req.method} request from ${req.url}`);
  Axios.get('http://localhost:3000/api/reservations/')
    .then((response) => {
      console.log('inside Axios');
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
