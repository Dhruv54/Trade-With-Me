const FyersAPI = require("fyers-api-v3").fyersModel;
const jwt = require('jsonwebtoken');

// Define the API route handler
const fyersloginHandler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.generate_access_token({ "secret_key": process.env.FYERS_SECRET_KEY, "auth_code": req.body.auth_code }).then((response) => {

                // Generate JWT token
                const fyerstoken = jwt.sign({ secret_key: process.env.FYERS_SECRET_KEY,auth_code:req.body.auth_code }, 'jwtsecret', { expiresIn: '1d' });
                res.status(200).json({ success: true, fyerstoken,response });
              }).catch((error) => {
                console.log(error)
              })

        } else {
            console.error("Method Not Allowed");
            res.status(405).json({ error: "Method Not Allowed", message: "The requested method is not allowed for this resource. Please use GET" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default fyersloginHandler;

