const Item = require("../model/item");

const items = [
    {
        "content": "Apples",
        "count": 10,
        "state": "DELIVERED",
        "createdAt": "2024-01-01T08:00:00Z",
    },
    {
        "content": "Oranges",
        "count": 20,
        "state": "CANCELED",
        "createdAt": "2024-03-12T08:00:00Z",
    },
    {
        "content": "Grapes",
        "count": 15,
        "state": "DELIVERED",
        "createdAt": "2024-04-20T08:00:00Z",
    },
    {
        "content": "Watermelons",
        "count": 5,
        "state": "DELIVERED",
        "createdAt": "2024-02-15T08:00:00Z",
    },
    {
        "content": "Cherries",
        "count": 8,
        "state": "CANCELED",
        "createdAt": "2023-06-01T08:00:00Z",
    }
];

async function seedItems() {
    try {
        await Item.insertMany(items);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}

module.exports = seedItems;
