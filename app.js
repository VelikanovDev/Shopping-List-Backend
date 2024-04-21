const mongoose = require("mongoose").default;
const express = require("express");
const ItemSchema = require("./model/item");
const ItemRouter = require("./routes/items");
const seedItems = require("./seeds/seed-items");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/shoppingItem", ItemRouter);

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/items")
    .then( async () => {
        console.log("DB connected");
        await checkAndSeedDatabase();
    })
    .catch((err) => console.log("Error connecting to MongoDB:", err));


// Function to check data and seed if necessary
async function checkAndSeedDatabase() {
    const countItem = await ItemSchema.countDocuments();

    if (countItem < 1) {
        console.log("No items found, seeding database...");
        await seedItems();
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
