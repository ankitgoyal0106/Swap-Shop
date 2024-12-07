import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import SQLiteProfileModel from "../model/SQLiteProfileModel.js";
import ProfileController from "./ProfileController.js";

// Load environment variables from a .env file
dotenv.config();

// Helper functions
// This function creates a response object with a status and a message.
const factoryResponse = (status, message) => ({ status, message });

//TODO: Look back at this in case of removal
// May not need this. SQLite checks this anyway
const existsUser = async (email) => {
  const user = await SQLiteProfileModel.read(email);
  return user;
};

// Registration route.
// This route creates a new user in the database.
export const register = async (req, res) => {
  const profileData = req.body;

  const hash = await bcrypt.hash(profileData.password, 10);
  profileData.password = hash;
  await ProfileController.createProfile(req, res);
  console.log("User registered successfully");
};

// Login route.
// This route checks the user's credentials and logs them in.
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await SQLiteProfileModel.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json(factoryResponse(401, "Invalid credentials"));
  }

  // Log the user in using the req.login() function provided by Passport.
  // This function establishes a login session for the user. The user object
  // is serialized and stored in the session. It can be accessed in subsequent
  // requests using req.user.
  req.login(user, (err) =>
    err ? next(err) : res.json(factoryResponse(200, "Login successful"))
  );
};

// Logout route.
// This route logs the user out.
// The req.logout() function is provided by Passport. It removes the user's
// session and logs them out.
export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.json(factoryResponse(500, "Logout failed"));
      return;
    }
    res.json(factoryResponse(200, "Logout successful"));
  });
};

// Google Authentication callback route.
// This route is called by Google after the user has authenticated.
// It redirects the user to the home page.
// export const googleAuthCallback = (req, res) => {
//   res.redirect("/");
// };

// Admin area route.
// This route is protected by the isAuthenticated and authorizeRole middleware.
// It returns a welcome message to the user.
// export const getAdminArea = (req, res) => {
//   res.json(factoryResponse(200, "Welcome to the admin area"));
// };

// Profile route.
// This route is protected by the isAuthenticated middleware.
// It returns a welcome message to the user.
export const getProfile = (req, res) => {
  res.json(factoryResponse(200, `Welcome, ${req.user.username}`));
};
