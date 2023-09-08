const express = require('express');
const router = express.Router();
const Item = require('./models/Item');

// Create a new item
router.post('/', async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
    })
});

// Read all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update an item
router.patch('/:itemId', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            { _id: req.params.itemId },
            { $set: { name: req.body.name, description: req.body.description } }
        );
        res.json(updatedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete an item
router.delete('/:itemId', async (req, res) => {
    try {
        const removedItem = await Item.remove({ _id: req.params.itemId });
        res.json(removedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
