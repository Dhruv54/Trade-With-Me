const FyersAPI = require("fyers-api-v3").fyersModel;

// Function to format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to get the date N days ago
function getDateNDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

// Define the API route handler
const fetch1hr20Data = async (req, res) => {
    try {
        if (req.method === 'POST') {
            
            // Initialize FyersAPI
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.setAccessToken(req.body);

           // Get today's date and the date 3 days ago
           const today = new Date();
           const formattedToday = formatDate(today);
           const threeDaysAgo = getDateNDaysAgo(3);
           const formattedThreeDaysAgo = formatDate(threeDaysAgo);

           // Construct the input object dynamically
           var inp = {
               "symbol": "BSE:SENSEX-INDEX",
               "resolution": "60",
               "date_format": "1",
               "range_from": formattedThreeDaysAgo,
               "range_to": formattedToday,
               "cont_flag": "1"
           };
            // Make the API request to get market status
            const market_status = await fyers.getHistory(inp)

            // Log the profile response
            console.log(market_status);

            // Send success response
            res.status(200).json({ success: true, market_status });
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
export default fetch1hr20Data;

