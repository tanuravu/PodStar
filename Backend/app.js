const express = require('express');
const app = express();
const cookieParser=require("cookie-parser");
const userApi = require("./routes/user"); 
require("dotenv").config();
require("./connection/connection");
app.use(cookieParser());
app.use(express.json());
// all routes
app.use("/api/v1", userApi);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
