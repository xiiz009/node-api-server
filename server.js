const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
dotenv.config({path: './config/config.env'});

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/store', require('./routes/store'));
app.use('/api/v1/uploads', require('./routes/uploads'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/images', require('./routes/images'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

