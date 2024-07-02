const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const getholdings = async (req, res) => {
    try {
        if (req.method === 'POST') {

            // Initialize FyersAPI
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.setAccessToken(req.body);
            const holdings = await fyers.get_holdings();

            // Send success response
            res.status(200).json({ success: true, holdings });
        } else {
            console.error("Method Not Allowed");
            res.status(405).json({ error: "Method Not Allowed", message: "The requested method is not allowed for this resource. Please use POST" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Export the handler function as the default export
export default getholdings;

