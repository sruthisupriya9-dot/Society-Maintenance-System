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
// society.js//
const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
    residentName: {
        type: String,
        required: true
    },

    flatNumber: {
        type: String,
        required: true
    },

    maintenanceAmount: {
        type: Number,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
});

module.exports = mongoose.model("Society", societySchema);
//societyroutes.js//
const express = require("express");
const router = express.Router();

const Society = require("../models/society");


// CREATE
router.post("/", async (req, res) => {
    try {
        const society = new Society(req.body);
        const savedData = await society.save();

        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// READ ALL
router.get("/", async (req, res) => {
    try {
        const data = await Society.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// READ BY ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Society.findById(req.params.id);

        if (!data)
            return res.status(404).json({ message: "Record not found" });

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updated = await Society.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Society.findByIdAndDelete(req.params.id);

        res.json({ message: "Record Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
