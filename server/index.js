const express = require('express')
const cors = require('cors');
const { connection } = require('./config/db');
const bookRoutes = require('./routes/books')

const app = express()

require('dotenv').config()
app.use(cors());
// app.use(bodyParser.json());

// const app = require('./app');
const port = process.env.PORT || 5000;

app.use('/api/books', bookRoutes);

app.listen(port, async() => {    
  try {
    await connection
    console.log('connected to db')
  } catch (error) {
    console.log(error)
    console.log('not connected to db')
  }
  console.log(`Server is running on port ${port}`);
});

