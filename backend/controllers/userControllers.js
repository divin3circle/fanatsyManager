import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generatetoken.js";

//@desc     Auth user/set token
//@route    POST /api/users/auth
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      fplTeamID: user.fplTeamID,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({ message: "Auth user" });
});

//@desc     Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, fplTeamID } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    fplTeamID,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      fplTeamID: user.fplTeamID,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Logout user
//@route    POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out user" });
});

export { authUser, registerUser, logoutUser };
