const FyersAPI = require("fyers-api-v3").fyersModel;
const fs = require('fs');

// Function to format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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
            console.log('dhruv..................',req.body);
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

           // const fyerstoken = localStorage.getItem('fyeraccesstoken');
            //console.log('fyeraccesstoken....................',fyerstoken);
           
            fyers.setAccessToken(req.body);

            // Get today's date
            const today = new Date();
            const formattedToday = formatDate(today);

             
            var inp={
                "symbol":"BSE:SENSEX-INDEX",
                "resolution":"1",
                "date_format":"1",
                "range_from":"2024-05-29",
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
