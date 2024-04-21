const express = require("express");
const router = express.Router();
const {
    createItem,
    allItems,
    deleteItem,
    updateItem,
} = require("../controller/items");

router.post("/create", createItem);
router.get("/list", allItems);
router.delete("/delete/:id", deleteItem);
router.put("/update/:id", updateItem);

module.exports = router;
