//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE3MTk4NTEwNjIsImV4cCI6MTcxOTg4MTA2MiwibmJmIjoxNzE5ODUwNDYyLCJhdWQiOiJbXCJ4OjBcIiwgXCJ4OjFcIiwgXCJ4OjJcIiwgXCJkOjFcIiwgXCJkOjJcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJZRDAzNjkwIiwib21zIjoiSzEiLCJoc21fa2V5IjoiMTBkMDdiOWFmMWZmZDZkZDQ2OThhYmY3NWMyYzRmMjYyOWU5MjE2YzM5NWNkNDgwY2NiZThmYWMiLCJub25jZSI6IiIsImFwcF9pZCI6IjVTTE44RkhSQkMiLCJ1dWlkIjoiNGU4MWQ5OWNiMTFlNGExZWFhMjUwY2MzZmYwZDA3NTAiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.YJsiFedy0zYWaRyXy733CIdzhDSOLB4w5tLtRrPo580

const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const exitorder = async (req, res) => {
    try {
        if (req.method === 'POST') {

            // Initialize FyersAPI
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            fyers.setAccessToken(req.body);

            const reqBody = {"exit_all":1}

            // Make the API request to get market status
            const order_status = await fyers.exit_position(reqBody)

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
export default exitorder;
