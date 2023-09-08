require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Atlas connection successful");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = dbConnect;
