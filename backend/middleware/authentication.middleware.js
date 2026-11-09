const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.task_tracker; //for the jwt token
  if (!token) {
    return res.status(401).json({ message: "Acess denied . please log in " });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secert_key",
    );
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({ message: "token has expired" });
    }
    return res.status(403).json({ message: "invalid token" });
  }
}

module.exports = { requireAuth };
