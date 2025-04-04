//In Redux, a reducer is a pure function that takes the current state and an action as arguments and returns a new state. Reducers specify how the application's state should change in response to an action.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    loader:true,
}

// create a slice 
// creating a slice required a slice name initial value and a reducer fuction which shows how the value will change on changing the action 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        userExist : (state,action) => {
            state.user = action.payload;
            state.loader = false
        },
        userNotExist : (state,action) => {
            state.user = null;
            state.loader = false
        }
    }

})

export default authSlice;

export const {userExist,userNotExist} = authSlice.actions;