const User = require("../../models/user");
const jwt = require("jsonwebtoken");

//for the user to sign up
module.exports.signup = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json(422, {
      message: "User with this email id alreay exists",
    });
  }
  if (req.body.password != req.body.confirm_password) {
    return res.json(422, {
      message: "Password and Confirm Password Fields does not match",
    });
  }
  let user1 = await User.create(req.body);
  if (user1) {
    return res.json(200, {
      message: "Sign up successful",
      success: true,
      data: {
        token: jwt.sign(user1.toJSON(), "CODIAX", { expiresIn: "100000000" }),
        user: user1,
      },
    });
  } else {
    return res.json(200, {
      message: "Sign up not successful",
    });
  }
};

//to login the user
module.exports.login = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (!user || user.password != req.body.password) {
    return res.json(422, {
      message: "Invalid Email / Password",
    });
  }
  return res.json(200, {
    message: "Here is the token",
    success: true,
    data: {
      token: jwt.sign(user.toJSON(), "CODIAX", { expiresIn: "100000000" }),
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    },
  });
};

//to update the user info
module.exports.edit = async function (req, res) {
  let user = await User.findOne({ email: req.user.email });
  if (user) {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "Password and Confirm Password Fields does not match",
      });
    }

    user.name = req.body.name;
    user.password = req.body.password;
    user.save();
    return res.json(200, {
      message: "user updation successful",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "CODIAX", { expiresIn: "100000000" }),
        user: user,
      },
    });
  }
};

//to find other users profile
module.exports.profile = async function (req, res) {
    const id=req.params.userId;
  let user = await User.findById(id);
  if (user) {
    return res.json(200, {
      message: "user's Profile is here",
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          _id: user.id,
        },
      },
    });
  } else {

    return res.json(422, {
      message: "User does not exist",
      user: {},
    });
  }
};

//to search with matching text
module.exports.search = function (req, res) {
  var result = [];
  
 
  var regex = new RegExp(req.params.text, "i");
  User.find({ name: regex }, { name: 1 })
    .select("name email _id")
    .sort({ updatedAt: -1 })
    .sort({ createdAt: -1 })
    .limit(15)
    .exec(function (err, data) {
      if (data && data.length && data.length > 0) {
        data.forEach((user) => {
          let obj = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };
          result.push(obj);
        });
        return res.json(200, {
          message: "Matched User's",
          success: true,
          data: {
            users: result,
          },
        });
      } else {
        return res.json(422, {
          message: "User does not exist",
          success: true,
          data: {
            users: [],
          },
        });
      }
    });
    
    
};
