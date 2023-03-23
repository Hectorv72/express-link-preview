require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.ts');
const os = require('os');

const app = express();
const port = process.env.PORT;

// configuraciones para recibir peticiones http en formato json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(morgan());
app.use(cors());

app.use('/', routes);

const server = app.listen(port, () => {
  const host = server.address().address;
  console.log(`Server listening on ${host}:${port}`)
});
