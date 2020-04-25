const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = mongoose.Schema({
  storeId: {
    type: String,
    require: [true, 'Please add Store Id'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store id length must be less than 10']
  },
  address: {
    type: String,
    require: [true, 'Please add your address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

StoreSchema.pre('save', async function(next) {
  const locations = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [locations[0].longitude, locations[0].latitude],
    formattedAddress: locations[0].formattedAddress
  }
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Store', StoreSchema);