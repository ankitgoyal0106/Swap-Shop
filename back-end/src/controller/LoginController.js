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
export const login = async (req, res) => {
  const { email, password } = req.query;

  const user = await SQLiteProfileModel.read(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json(factoryResponse(401, "Invalid email or password. Please check that the email and password you entered are correct."));
  } else {
    return res.json({ user });
  }
};

// TODO: Implement Logout
export const logout = (req, res) => {
  console.error("Logout not implemented");
};
