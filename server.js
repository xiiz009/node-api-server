const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({path: './config/config.env'});

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/v1/store', require('./routes/store'));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

