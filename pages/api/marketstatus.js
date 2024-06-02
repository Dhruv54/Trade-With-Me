const FyersAPI = require("fyers-api-v3").fyersModel;
const fs = require('fs');

async function readTextFromFileAndParseJSON(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        console.log('Data read from file and parsed into JSON:', data);
        return data;
    } catch (error) {
        console.error('Error reading file or parsing data into JSON:', error);
        return null;
    }
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

            
            const filePath='access_token.txt';
            const data = await readTextFromFileAndParseJSON(filePath)
            console.log(data);
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            fyers.setAccessToken(jsonData.access_token);

            var inp={
                "symbol":"BSE:SENSEX-INDEX",
                "resolution":"60",
                "date_format":"1",
                "range_from":"2024-05-03",
                "range_to":"2024-05-06",
                "cont_flag":"1"
            }
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

