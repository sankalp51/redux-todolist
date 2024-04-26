import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ListItem from "./ListItem";
import Input from "./Input";
import { useEffect } from "react";
import { fetchList } from "../redux/list/listSlice";
import { addNewItem } from "../redux/list/listSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function List() {
    const data = useSelector((state) => state.list.list);
    const status = useSelector(state => state.list.status);
    const dispatch = useDispatch();
    const [listItem, setListItem] = useState("");

    const notifySuccess = () => {
        toast.success("Successfully added todo item", { position: "top-center" });
    }

    const notifyError = () => {
        toast.error("Cannot add empty item", { position: "top-center" });
    }


    const handleSubmit = () => {
        if (listItem) {
            dispatch(addNewItem({ item: listItem }));
            notifySuccess();
            setListItem("");
        }
        else {
            notifyError();
        }
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchList());
        }
    }, [status, dispatch]);


    const listItems = <ul className="divide-y divide-gray-200">
        {data.map((item) => (
            <ListItem key={item._id} item={item.item} date={item.createdAt} id={item._id} />
        ))}
    </ul>


    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-center text-2xl font-bold text-black">Redux Todo List</h1>

            {data.length ? listItems : <p className="text-red-500 text-center font-bold my-1">List is empty!</p>}
            <div className="flex mt-4 space-x-2">
                <Input
                    type="text"
                    value={listItem}
                    onChange={(e) => setListItem(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter todo"
                />
                <button
                    title="Add new Item"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                >
                    <AddCircleOutlineIcon />
                </button>
            </div>
        </div>
    );
}