const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies?.podcasterUserToken;

        if (!token) {
            console.log("No token found in cookies.");
            return res.status(401).json({ message: "Authentication failed: No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found for the provided token.");
            return res.status(404).json({ message: "Authentication failed: User not found." });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("AuthMiddleware Error:", error.message);
        res.status(401).json({ message: "Authentication failed: Invalid or expired token." });
    }
};

module.exports = authMiddleware;
