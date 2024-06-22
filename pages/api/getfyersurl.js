const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const getfyersurlHandler = async (req, res) => {
    try {
        if (req.method === 'GET') {

            const fyers = new FyersAPI()

            fyers.setAppId(process.env.FYERS_APP_ID)
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL)

            const redirecturl = fyers.generateAuthCode()

            console.log(redirecturl)

            res.status(200).json({ success: true, redirecturl });
        } else {
            console.error("Method Not Allowed");
            res.status(405).json({ error: "Method Not Allowed", message: "The requested method is not allowed for this resource. Please use POST" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default getfyersurlHandler;

