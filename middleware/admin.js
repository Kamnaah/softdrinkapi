const jwt = require("jsonwebtoken");
const secretKey2="wearewearegonarocktheworld";
const verifyTokenforadmin = (req, res, next) => {
  let  token =
    req.body.token || req.query.token || req.headers["auth"];
   // console.log(token)
    token=token.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for Authorization");
  }
  try {
    const decoded = jwt.verify(token,secretKey2);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("you dont have access"); 
  }
  return next();
};

module.exports = verifyTokenforadmin;