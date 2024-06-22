// Import necessary modules
import database_connection from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

// Define the API route handler
const loginHandler = async (req, res) => {
    try {
        if(req.method === 'POST') {
            const { email, password } = req.body;
            
            // Connect to the database
            await database_connection();

            // Find the user with the provided email
            const user = await User.findOne({ email });

            var bytes  = CryptoJS.AES.decrypt(user.password,"secret123");
            var userpassword = bytes.toString(CryptoJS.enc.Utf8);
            console.log(user.password)
            // If user is found and password matches
            if (user && userpassword == password) {
                // Generate JWT token
                const token = jwt.sign({ email: user.email,password:user.password }, 'jwtsecret', { expiresIn: '1d' });

                // Send success response
                res.status(200).json({ success: true,token, message: "Login successful" });
            } else {
                // Send error response
                res.status(401).json({ success: false, error: "Unauthorized", message: "Invalid email or password" });
            }
        } else {
            // Handle other HTTP methods
            res.status(405).json({ error: "Method Not Allowed", message: "The requested method is not allowed for this resource. Please use POST" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Export the handler function as the default export
export default loginHandler;
