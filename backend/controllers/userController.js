const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyRefresh(email, token) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded.email === email;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find(
      {},
      { firstName: 1, lastName: 1, email: 1, userType: 1 }
    );
    return res.status(200).send({
      data: users,
      message: "Records fetched successfully",
    });
  } catch (error) {
    return res.status(201).send({
      message: "Records fetching unsuccessful",
    });
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, firstName, lastName, adminCode, employeeId } =
      req.body;

    console.log(adminCode);
    let userType = "employee";
    if (!email)
      return res.status(201).send({ msg: "Not all fields have been entered." });
    if (userType === "admin" && password.length < 5)
      return res
        .status(400)
        .send({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .send({ msg: "An account with this email already exists." });
    if (!firstName) firstName = email;
    if (!lastName) lastName = email;

    if (adminCode !== undefined && adminCode !== "") {
      if (adminCode != "528491") {
        return res.status(500).send({ message: "Invalid Admin Code" });
      }
      userType = "admin";
    }

    let generatePassword = "";
    if (userType === "employee") {
      generatePassword = firstName.concat("", employeeId);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(
      userType !== "admin" ? generatePassword : password,
      salt
    );
    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      userType,
      bills: [],
    });
    const savedUser = await newUser.save();
    res.send({
      data: savedUser,
      message: "Successfully registered user",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(500).send({ msg: "Not all fields have been entered." });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(500)
        .send({ msg: "No account with this email has been registered." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(500).send({ msg: "Invalid credentials." });
    const accessToken = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).send({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        bills: user.bills,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.send(deletedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.isTokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.send(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.send(false);
    const user = await User.findById(verified.id);
    if (!user) return res.send(false);
    return res.send(true);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    let user = await User.findOne(
      { _id: req.params.id },
      {
        password: 0,
      }
    );
    return res.status(200).send({
      message: "User found sucessfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in finding user", error: error.message });
  }
};

module.exports.useRefreshToken = async (req, res) => {
  try {
    const { email, refreshToken } = req.body;
    const isValid = verifyRefresh(email, refreshToken);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token,try login again" });
    }
    const accessToken = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return res.status(200).send({ accessToken: accessToken });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
