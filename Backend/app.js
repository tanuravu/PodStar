const express = require('express');
const app = express();
const userApi = require("./routes/user"); 
require("dotenv").config();
require("./connection/connection");

// all routes
app.use(express.json());
app.use("/api/v1", userApi);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
