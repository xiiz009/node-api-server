const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      console.log(`Mongo connected: ${con.connection.host}`)
    } catch (error) {
      console.log(error) ;
    }
}
module.exports = connectDB;