const { checkToken } = require("../userHelper");

module.exports = checkAuthentication = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    const userName = checkToken(token);
    req.username = userName;
    await next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
