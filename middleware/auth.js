const jwt = require("jsonwebtoken");
const secretKey="1234566789900";
const secretKey2="wearewearegonarocktheworld";
const verifyToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["auth"];
    //console.log(token)
    token=token.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for Authorization");
  }
  try {
    const decoded = jwt.verify(token,secretKey);
    req.user = decoded;
  } catch (err) {
    try {
      const decoded = jwt.verify(token,secretKey2);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
  return next();
};

module.exports = verifyToken;