const express = require('express');
const fs = require('fs');
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// allow static files to be included in html
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public'));


let reservations = [];
let waitlist = [];

// ROUTES

// html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get('/tables', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/viewTables.html"));
});

app.get('/reserve', (req,res) => {
  res.sendFile(path.join(__dirname, "/views/makeReservation.html"));
});

app.get('/api/tables', (req, res) => {
  res.json(reservations);
});

app.get('/api/waitlist', (req, res) => {
  res.json(waitlist);
});

app.post('/api/tables', (req, res) => {
  const customer = req.body;
  if(reservations.length < 2)
    reservations.push(customer);
  else waitlist.push(customer);
  res.json(customer)

  console.log("Reservations");
  console.log(reservations);
  console.log("Waitlist");
  console.log(waitlist);
});

app.post('/api/clear', (req, res) => {
  reservations = [];
  waitlist = [];
  res.sendStatus(200);
});



const server = app.listen(PORT, function () {
   console.log("Example app listening at http://localhost:" + PORT);
});
