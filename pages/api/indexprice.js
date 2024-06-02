const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const fyersloginHandler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            // Make the API request to get profile
            const profile = await fyers.get_profile();

            // Log the profile response
            console.log(profile);

            // Send success response
            res.status(200).json({ success: true, profile });
        } else {
            console.error("Method Not Allowed");
            res.status(405).json({ error: "Method Not Allowed", message: "The requested method is not allowed for this resource. Please use GET" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Export the handler function as the default export
export default fyersloginHandler;

