const jwt = require("jsonwebtoken");

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SECRET", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // we are adding the jwt to the req that goes
      req.userId = user.id;
      next();
    });
  } else {
    res.status(401).send({ message: "user is not authorized" });
  }
};

module.exports = authenticateJwt;
