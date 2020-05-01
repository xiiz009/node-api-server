const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@Des Register
//@route POST /api/v1/user/register
//@access public
exports.register = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if(!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  }
  if (password !== password2) {
    errors.push({ msg: 'Password do not match' });
  }
  if(password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters'});
  }
  if(errors.length) {
    return res.json(errors).status(403);
  }else {
    User.findOne({ email }).then(user => {
      if(user) {
        errors.push({ msg: 'User Exist'});
        return res.status(403).json({
          success: false,
          errors
        })
      }else {
        const newUser = new User({ name, email, password});
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              throw err;
            }
            newUser.password = hash;
            newUser.save()
                .then(user => {
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
                          token
                        }).catch(err => console.log(err));
                      }
                    }
                );
              }
            );
          });
        });
      }
    })
  }
}

exports.getUsers = (req, res) => {
  User.find()
    .then(users => {
      return res.status(200).json({
        success: true,
        data: users
      });
    })
    .catch(error => console.log(error));
}