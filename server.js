const express = require('express')
const cors = require("cors");
const routes = require('./routes')
require("dotenv").config();

const app = express()
const configureDb = require('./config');

app.use(cors());
app.use(express.json());

(async () => {
  configureDb()
})()

app.use('/api', routes)

app.listen( process.env.PORT || 4000, () => {
  console.log(`Server is running!`);
});