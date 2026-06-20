const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Import Routes
const societyRoutes = require("./routes/societyroutes");
app.use("/society", societyRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/societyDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});