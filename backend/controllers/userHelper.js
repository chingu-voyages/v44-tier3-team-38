const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.returnSignupError = (error, res) => {
  let message = error.message.toLowerCase();
  if (message.includes("validation"))
    return res.status(422).json({ error: "email or username  already in use" });
  //
  return message.includes("salt") // check password hashing error
    ? res.status(400).json({ error: "password encryption failed" })
    : res.status(400).json({ error: error.message });
};

exports.encryptPassword = (password) => {
  return (encryptedPass = bcrypt.hashSync(password, 10));
};

exports.checkPassword = (password, hashedPassword) => {
  const isValid = bcrypt.compareSync(password, hashedPassword);
  return isValid ? true : false;
};

exports.createToken = (username) => {
  const token = jwt.sign(
    {
      username: username,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: "1h" }
  );
  if (!token || !username) throw new Error("problem creating token");
  return token;
};

exports.checkToken = (token) => {
  let userName;
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) throw new Error("authentication error");
    userName = decoded.username;
  });
  return userName;
};
