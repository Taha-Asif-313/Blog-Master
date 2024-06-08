const JWT = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
  try {
    const token = req.Cookies.Token;
    if (token == "") {
      res.json({
        success: false,
        message: "Login first!",
      });
    }
    const user = JWT.verify(token, process.env.SECRET);
    req.body = user;
    return res.json({
      success: true,
      message: "Logged in!",
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = isLogin;
