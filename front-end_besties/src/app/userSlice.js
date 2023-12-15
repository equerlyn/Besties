import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    thisUser : {},
    loggedIn : false,
    thisFriend : "",
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setThisUser : (state, action) => {
            state.thisUser = action.payload
        },
        setLoggedIn : (state, action) => {
            state.loggedIn = action.payload
        },
        setThisFriend : (state, action) => {
            state.thisFriend = action.payload
        }
    }
})

export const {setThisUser, setLoggedIn, setThisFriend} = userSlice.actions

export default userSlice.reducer