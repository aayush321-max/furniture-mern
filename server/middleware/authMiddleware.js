const jwt = require("jsonwebtoken");

// 🔐 Token verify
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log("ayth header:",authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token only:",token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );
    console.log(
        "decoded:",decoded) ;

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    console.log("jwt error:",error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔐 Admin check
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };