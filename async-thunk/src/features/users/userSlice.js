import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users:[],
    status:'idle',
    error:null
}

export const fetchUsers = createAsyncThunk('users/fectchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
       builder
       .addCase(fetchUsers.pending, (state,action) => {
         state.status = 'loading'
       })
       .addCase(fetchUsers.fulfilled, (state, action) => {
           state.status = 'succedded'
           state.users = state.users.concat(action.payload)
       })
       .addCase(fetchUsers.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
       })
    }
})

export const getUserError = (state) => state.error;
export const getUserStatus = (state) => state.status;
export const selectAllUsers = (state) => state.users.users;

export default usersSlice.reducer