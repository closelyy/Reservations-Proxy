/* eslint-disable no-console */
const express = require('express');
const Axios = require('axios');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join('public')));

const indexPath = path.join(__dirname, 'public/index.html');

app.get('/businesses/:id', (req, res) => {
  res.sendFile(indexPath);
});

app.get('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  Axios.get(`http://ec2-54-183-230-236.us-west-1.compute.amazonaws.com:3001/api/reviews/${id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

app.get('/api/businesses/:id/photos', (req, res) => {
  const { id } = req.params;
  Axios.get(`http://ec2-54-193-58-80.us-west-1.compute.amazonaws.com:3003/api/businesses/${id}/photos`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get('/businesses/Pictures/:id', (req, res) => {
  const { id } = req.params;
  Axios.get(`http://ec2-54-183-230-236.us-west-1.compute.amazonaws.com:3001/Pictures/${id}`)
    .then((response) => {
      console.log(response);
      res.status(200).send(response.data);
    })
    .catch(console.log);
});

app.get('/api/reservations/', (req, res) => {
  console.log(`${req.method} request from ${req.url}`);
  Axios.get('http://ec2-13-57-254-245.us-west-1.compute.amazonaws.com:3002/api/reservations/')
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
