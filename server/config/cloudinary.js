require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'dea8fwj6d', 
  api_key: '858219198754464', 
  api_secret: '***************************' 
});

module.exports = cloudinary;
