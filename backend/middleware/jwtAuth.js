const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    req.user = verified.email;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
