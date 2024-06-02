//  Import necessary modules
import database_connection from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");

// Define the API route handler
const addUserHandler = async (req, res) => {
    try {
        if(req.method=='POST')
        {
            console.log(req.body);
            const {username,email}=req.body;
            await database_connection();
            
            let u = User({username,email,password : CryptoJS.AES.encrypt(req.body.password,"secret123").toString()})
            await u.save();

            // Send success response
            res.status(200).json({ success: true, message: "User added successfully" });
        }
        else
        {
            console.error("Method Not Allowed");
            res.status(405).json({error: "Method Not Allowed",message: "The requested method is not allowed for this resource. Please use POST"}); 
        }
    } catch (error) {
        // Handle errors
        console.error("Error adding user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Export the handler function as the default export
export default addUserHandler;
