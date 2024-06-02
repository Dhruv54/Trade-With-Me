// username : Dhruv@123456 pass :DcNCktiozwIzfwXv  ip :49.36.89.93/32

const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{timestamps:true});

export default mongoose.models.User || mongoose.model("User",UserSchema);


