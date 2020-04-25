const Store = require('../models/Store');

//@Des Get all store
//@route GET /api/v1/store
//@access public
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      data: stores,
      count: stores.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

//@Des Create a store
//@route POST /api/v1/store
//@access public
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    return res.status(201).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error(error);
    if(error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Store already exists'
      });
    }
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}