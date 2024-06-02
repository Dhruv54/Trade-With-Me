const FyersAPI = require("fyers-api-v3").fyersModel;
const fs = require('fs');

async function writeTextToFileAsync(filePath, text) {
    try {
        await fs.promises.writeFile(filePath, text);
        console.log('Text has been written to', filePath);
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

// Define the API route handler
const fyersloginHandler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const fyers = new FyersAPI();
            fyers.setAppId(process.env.FYERS_APP_ID);
            fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);

            fyers.generate_access_token({ "secret_key": process.env.FYERS_SECRET_KEY, "auth_code": req.body.auth_code }).then((response) => {
                console.log(response);

                console.log("done done done")
                const filePath='access_token.txt';
                const text = JSON.stringify(response);
                console.log(text);

                writeTextToFileAsync(filePath, text);


            //     fs.writeFile(filePath, text, (err) => {
            //       if (err) {
            //           console.error('Error writing to file:', err);
            //           return;
            //       }
            //       console.log('Text has been written to', filePath);
            //   });

                //const access_token = response.access_token
                res.status(200).json({ success: true, response });
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

