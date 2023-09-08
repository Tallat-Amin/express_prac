const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createJwtToken = (id) => {
  return jwt.sign({ id }, "tallat@svl", {
    expiresIn: "1h",
  });
};

module.exports.signup_POST = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createJwtToken(user._id);
    resp.status(201).cookie("userToken", token).json(user);
  } catch (err) {
    console.log(err.message, err.status);
    resp.status(401).send(err.message);
  }
};

module.exports.login_POST = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = await createJwtToken(user._id);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        resp
          .status(201)
          .cookie("userToken", token)
          .send("login post via controller success");
      } else console.log("incorrect password");
    } else console.log("incorrect email");
    resp.status(201).send("login post via controller success");
  } catch (e) {
    console.log("error: ", e);
    resp.status(404).send("Resource not found");
  }
};
