const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./../models/User");

//register new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, userId, nic, userRole, phoneNumber, password } = req.body;

  if (!firstName || !lastName || !userId || !phoneNumber || !nic || !userRole || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields." });
  }

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");
    const newUser = new User({
      firstName,
      lastName,
      userId,
      phoneNumber,
      nic,
      userRole,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


//login user
exports.loginUser = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide userId and password." });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId or password." });
    }

    const hashedInputPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    if (hashedInputPassword !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId or password." });
    }

    const payload = {
      user: {
        id: user._id,
        userId: user.userId,
        userRole: user.userRole,
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error: JWT secret not set.",
      });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Error in loginUser:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
