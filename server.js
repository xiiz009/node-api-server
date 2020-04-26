const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
dotenv.config({path: './config/config.env'});
const { upload } = require('./controllers/uploads');

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/v1/store', require('./routes/store'));
app.use('/api/v1/uploads', require('./routes/uploads'));
app.use('/images', require('./routes/images'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

