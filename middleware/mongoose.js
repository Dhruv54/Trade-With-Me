import mongoose from "mongoose";
    
    const MONGO_URI =process.env.MONGO_URI_RELEASE;
    console.log(`Connecting to ${MONGO_URI}`);
    
    const database_connection = async () => {
      if (global.connection?.isConnected) {
        console.log("reusing database connection")
        return;
      }
    
      const database = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    
      global.connection = { isConnected: database.connections[0].readyState }
      console.log("new database connection created")
      
    };
    
    export default database_connection;