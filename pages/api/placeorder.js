const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const placeorder = async (req, res) => {
    try {
        if (req.method === 'POST') {

            // Initialize FyersAPI
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.setAccessToken(req.body);

            const reqBody={
                "symbol":"NSE:SBIN-EQ",
                "qty":1,
                "type":1,
                "side":-1,
                "productType":"INTRADAY",
                "limitPrice":355,
                "stopPrice":0,
                "disclosedQty":0,
                "validity":"DAY",
                "offlineOrder":false,
                "stopLoss":0,
                "takeProfit":0,
                "orderTag":"tag1"
          }
       
            // Make the API request to get market status
            const order_status = await fyers.place_order(reqBody)

            // Log the profile response
            console.log(order_status);
            // Send success response
            res.status(200).json({ success: true, order_status });
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
export default placeorder;
