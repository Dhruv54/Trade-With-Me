const FyersAPI = require("fyers-api-v3").fyersModel;

// Define the API route handler
const getholdings = async (req, res) => {
    try {
        if (req.method === 'POST') {
            // Initialize FyersAPI
            const fyers = new FyersAPI();
            // Set FyersAPI configurations
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
            const filePath='access_token.txt';
            const data = await readTextFromFileAndParseJSON(filePath)
            console.log(data);
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            fyers.setAccessToken(jsonData.access_token);
           // fyers.setAccessToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE3MTA2ODA4NDUsImV4cCI6MTcxMDcyMTgyNSwibmJmIjoxNzEwNjgwODQ1LCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCbDl1c05BdF9oNmY1VnMzWVBadTI2WmZNX3dlV09xeWFKRXVHZGU4S1ItRnRkZmJTSUpLdlgzeUlqNXNwNlJXaV9uSG5zSTBjMEZEa1ZYaDVKaHhwREQ1Z3pTamtfTG5wOXZPazQzTDg0NVJfNF9Zbz0iLCJkaXNwbGF5X25hbWUiOiJESFJVViBKQVlBTlRJQkhBSSBQQVRFTCIsIm9tcyI6IksxIiwiaHNtX2tleSI6bnVsbCwiZnlfaWQiOiJZRDAzNjkwIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.OFI1thwPJDDsjujPOivt7iQl3wA4ZWYwlkiGOhWP7tY");

            // Make the API request to get profile
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

