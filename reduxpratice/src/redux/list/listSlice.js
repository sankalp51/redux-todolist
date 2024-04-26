import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    list: [],
    status: "idle",
    error: null
}

export const fetchList = createAsyncThunk("list/getList", async () => {
    const todolist = await axios.get("http://localhost:3000/api/list/get-list");
    return todolist.data;
});

export const addNewItem = createAsyncThunk("list/addNewItem", async item => {
    const response = await axios.post("http://localhost:3000/api/list/add-new-item", item);
    return response.data;
});

export const deleteItem = createAsyncThunk("list/deleteItem", async id => {
    const response = await axios.delete(`http://localhost:3000/api/list/delete-item/${id}`);
    console.log(response.data);
    return response.data;
});

export const updateItem = createAsyncThunk("list/updateItem", async item => {
    const response = await axios.patch(`http://localhost:3000/api/list/update-item/${item.id}`, { item: item.data });
    return response.data;
})


const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchList.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.status = "success";
                state.list = action.payload;
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                console.log(action.payload);
                state.list = state.list.filter(item => item._id !== action.payload.deletedItem._id);
            })
    }

});

export default listSlice.reducer;