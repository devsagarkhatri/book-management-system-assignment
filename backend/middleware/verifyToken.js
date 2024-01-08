const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token was not provided" });
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token given" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
