const authService = require("../service/auth.service");


const cookie_options={
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge:60*60*1000

}



async function getMe(req,res){
  const user = await authService.authMe(req.user.id);
  if(!user){
    return res.status(401).json({message:"Your session is no longer valid. Please log in again."});
  }
return res.status(200).json({
      message: "Authenticated",
      user: user,
    });
}
async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await authService.registerUser(name, email, password);
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email is already registered" });
    }
    console.error("User registration failed:", err);
    return res.status(500).json({ message: "Unable to register user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await authService.loginUser(email, password);
    res.cookie("task_tracker",result.token,cookie_options
    )
    
    return res.status(200).json({
      message: "Login successful",
      user: result.user,
    });

    
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Login failed",
    });
  }
}

function logout(req,res){
res.clearCookie("task_tracker",cookie_options);
return res.status(200).json({message:"Logged out successfully"})
}
module.exports = {
  register,
  login,
  logout,
  getMe
};
