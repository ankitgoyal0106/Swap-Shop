import bcrypt from 'bcryptjs';
import SQLiteProfileModel from "../model/SQLiteProfileModel.js";
export const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Fetch the user profile by email
        const user = await SQLiteProfileModel.read(email);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: Invalid email or password" });
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Unauthorized: Invalid email or password" });
        }

        // Attach the user profile to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// export const authorize = (condition) => (req, res, next) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ error: "Unauthorized: No user authenticated" });
//         }

//         // Check the condition (e.g., user role, email, etc.)
//         if (!condition(req.user)) {
//             return res.status(403).json({ error: "Forbidden: You do not have access to this resource" });
//         }

//         next();
//     } catch (error) {
//         console.error("Authorization error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };