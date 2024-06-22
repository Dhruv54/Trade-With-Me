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
const getprofile = async (req, res) => {
    try {
        if (req.method === 'GET') {
            // Initialize FyersAPI
            const fyers = new FyersAPI();
            // Set FyersAPI configurations
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);

            
            const filePath='access_token.txt';
            const data = await readTextFromFileAndParseJSON(filePath)
            const jsonData = JSON.parse(data);
            fyers.setAccessToken(jsonData.access_token);

            // Make the API request to get profile
            const profile = await fyers.get_profile();

            // Log the profile response
            console.log(profile);

            // Send success response
            res.status(200).json({ success: true, profile });
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
export default getprofile;

