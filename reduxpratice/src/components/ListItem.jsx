import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { deleteItem, updateItem } from "../redux/list/listSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ListItem({ item, date, id }) {
    const [checked, setChecked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);
    const dispatch = useDispatch();


    const nofifyDelete = () => {
        toast.info("Item deleted", { position: "top-center" })
    }

    const handleEdit = () => {
        setIsEditing(true); // Allow editing
    };

    const handleSave = () => {
        setIsEditing(false); // Disable editing
        if (!editedItem?.length) {
            setEditedItem(item);
        }
        dispatch(updateItem({ id, data: editedItem })); // Save the edited item
    };

    const handleDelete = () => {
        dispatch(deleteItem(id));
        nofifyDelete();
    }

    return (
        <li className="flex items-center justify-between py-2 border-b border-gray-300">
            <div className="flex items-center space-x-3">
                <input
                    title="mark as done"
                    type="checkbox"
                    onChange={() => setChecked((prevState) => !prevState)}
                    className="hover:cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={editedItem} // Bind the value to the editedItem state
                    onChange={(e) => setEditedItem(e.target.value)} // Update the state when the input changes
                    readOnly={!isEditing} // Make it read-only unless editing
                    className={`text-gray-700 ${checked ? "line-through" : ""} ${isEditing ? "border border-gray-300 rounded" : ""} p-2`}
                />
            </div>
            <div className="flex items-center space-x-4">
                <i className="text-sm text-gray-500">{formatDistanceToNow(date, { addSuffix: true })}</i>
                <button
                    title="delete item"
                    className="bg-red-600 text-white hover:bg-red-800 p-2 rounded-md"
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </button>
                {isEditing ? (
                    <button
                        title="save edit"
                        onClick={handleSave}
                        className="bg-green-600 text-white hover:bg-green-800 p-2 rounded-md"
                    >
                        <DoneIcon />
                    </button>
                ) : (
                    <button
                        title="edit item"
                        onClick={handleEdit}
                        className="bg-blue-600 text-white hover:bg-blue-800 p-2 rounded-md"
                    >
                        <EditIcon />
                    </button>
                )}
            </div>
        </li>
    );
}
