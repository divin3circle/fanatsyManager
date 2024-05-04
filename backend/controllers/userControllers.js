import asyncHandler from "express-async-handler";

//@desc     Auth user/set token
//@route    POST /api/users/auth
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth user" });
});

//@desc     Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register user" });
});

//@desc     Logout user
//@route    POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout user user" });
});

export { authUser, registerUser, logoutUser };
