const List = require('../models/List');

const addNewItem = async (req, res) => {
    try {
        const { item } = req.body;
        if (!item) return res.status(400).json({ messsage: "empty item recieved" });

        const newListItem = new List({ item });
        await newListItem.save();
        res.status(200).json(newListItem);
    } catch (error) {
        console.log(error.message);
    }
}

const getAllItems = async (req, res) => {
    try {
        const allItems = await List.find().lean();
        if (!allItems) return res.status(404).json({ message: "No items found" });
        res.status(200).json(allItems);
    } catch (error) {
        conosle.log(error.message);
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { item } = req.body;
        const updatedItem = await List.findOneAndUpdate({ _id: id }, { item });
        res.status(200).json(updatedItem)
    } catch (error) {

    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await List.findByIdAndDelete(id);
        res.status(200).json({ deletedItem });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { addNewItem, getAllItems, deleteItem, updateItem };