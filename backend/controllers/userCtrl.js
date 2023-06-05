const Users = require("../db/models/")["users"];
const {
  encryptPassword,
  returnSignupError,
  checkPassword,
  createToken,
} = require("./userHelper");

exports.signUp = async (req, res) => {
  const { ...user } = req.body;
  if (Object.keys(user).length === 0)
    return res.status(400).json({ message: "request body can't be empty" });
  // encrypt pass and save to database
  // should throw an error if email or username is already present or if pass encryption failed
  try {
    const encryptedPass = encryptPassword(user.password);
    await Users.create({
      username: user.username,
      password: encryptedPass,
      email: user.email,
    });
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return returnSignupError(error, res);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // check for empty body
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "body request mush have username and password" });
  try {
    const databaseUser = await Users.findOne({ where: { username } });
    if (databaseUser) {
      const isPasswordValid = checkPassword(password, databaseUser.password);
      if (!isPasswordValid) throw new Error("password is not valid");
      const token = createToken(username);
      res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
      return res.status(201).json({ user: databaseUser });
    }
    res.status(404).json({ error: "user not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const username = req.body.username;
  if (!username)
    return res
      .status(400)
      .json({ error: "request body should have a username" });
  const deleteResponse = await Users.destroy({ where: { username } });
  return deleteResponse
    ? res.status(200).clearCookie("token").json({ message: "success" })
    : res.status(404).json({ error: "user was not found" });
};

exports.getUser = async (req, res) => {
  const userName = req.username;
  try {
    const userResponse = await Users.findOne({
      where: {
        username: userName,
      },
    });
    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

exports.signOut = async (req, res) => {
  try {
    if (!req.cookies.token) throw new Error("you are not authenticated");
    res.clearCookie("token");
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users = await Users.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
