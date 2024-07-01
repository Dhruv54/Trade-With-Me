//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE3MTk4NTEwNjIsImV4cCI6MTcxOTg4MTA2MiwibmJmIjoxNzE5ODUwNDYyLCJhdWQiOiJbXCJ4OjBcIiwgXCJ4OjFcIiwgXCJ4OjJcIiwgXCJkOjFcIiwgXCJkOjJcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJZRDAzNjkwIiwib21zIjoiSzEiLCJoc21fa2V5IjoiMTBkMDdiOWFmMWZmZDZkZDQ2OThhYmY3NWMyYzRmMjYyOWU5MjE2YzM5NWNkNDgwY2NiZThmYWMiLCJub25jZSI6IiIsImFwcF9pZCI6IjVTTE44RkhSQkMiLCJ1dWlkIjoiNGU4MWQ5OWNiMTFlNGExZWFhMjUwY2MzZmYwZDA3NTAiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.YJsiFedy0zYWaRyXy733CIdzhDSOLB4w5tLtRrPo580

const FyersAPI = require("fyers-api-v3").fyersModel;

// Function to format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Define the API route handler
const livemarket = async (req, res) => {
    try {
        if (req.method === 'POST') {
            // Initialize FyersAPI
            const fyers = new FyersAPI();

            // Set FyersAPI configurations
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.setAccessToken(req.body);

            // Get today's date
            const today = new Date();
            const formattedToday = formatDate(today);

            var inp={
                "symbol":"BSE:SENSEX-INDEX",
                "resolution":"1",
                "date_format":"1",
                "range_from":formattedToday,
                "range_to":formattedToday,
                "cont_flag":"1"
            }
            // var inp={
            //     "symbol":"BSE:SENSEX-INDEX",
            //     "resolution":"60",
            //     "date_format":"1",
            //     "range_from":"2024-05-29",
            //     "range_to":"2024-05-29",
            //     "cont_flag":"1"
            // }
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
export default livemarket;
