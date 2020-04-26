const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@Des Login
//@route POST /api/v1/auth/login
//@access private

exports.login = (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if(!email || !password) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  } else {
    User.findOne({ email }).then(user => {
      if(!user) {
        errors.push({ msg: 'User Does Not Exist'});
        return res.status(403).json({
          success: false,
          errors
        })
      }else {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(!isMatch) {
              return res.status(400).json({
                success: false,
                msg: 'Invalid Password'
              });
            }else {
              jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) {
                    throw err;
                  }else {
                    res.status(201).json({
                      success: true,
                      token,
                      user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                      }
                    }).catch(err => console.log(err));
                  }
                }
              );
            }
          });
      }
    })
  }
}

//@Des Login
//@route GET /api/v1/auth/user
//@access private
exports.getUser = (req, res ) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      return res.status(200).json({
        success: true,
        user
      })
    })
    .catch(error => console.log(error));
}

