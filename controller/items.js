const Item = require("../model/item");

exports.createItem = async (req, res) => {
    try {
        const newItem = new Item({
            content: req.body.content,
            count: req.body.count,
            state: req.body.state,
            createdAt: new Date().toISOString()
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: "Error creating item", error: error.message });
    }
};

exports.allItems = async (req, res) => {
    try {
        // Extract query parameters
        const { state, createdAt, content } = req.query;
        const query = {};

        // Filter by content (text search)
        if (content) {
            query.content = { $regex: content, $options: 'i' }; // Case-insensitive partial match
        }

        // Filter by state
        if (state) {
            query.state = { $in: state.split(',') };
        }

        // Filter by createdAt date range
        if (createdAt) {
            const dates = createdAt.split('to');
            query.createdAt = {
                $gte: new Date(dates[0]).toISOString(), // Greater than or equal to the start date
                $lte: new Date(dates[1]).toISOString()  // Less than or equal to the end date
            };
        }

        const items = await Item.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving items", error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const result = await Item.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: "Item deleted successfully" });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    content: req.body.content,
                    count: req.body.count,
                    state: req.body.state,
                    createdAt: req.body.createdAt
                }
            },
            { new: true } // Return the updated document
        );
        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
};
