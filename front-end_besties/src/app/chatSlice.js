import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    chats: [],
    latestChat: [],
    pinnedChats: [],
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setChats : (state, action) => {
            state.chats = action.payload
        },
        setLatestChat : (state, action) => {
            state.latestChat = action.payload
        },
        setPinnedChats : (state, action) => {
            state.pinnedChats = action.payload
        },
    }
})

export const {setChats, setLatestChat, setPinnedChats} = chatSlice.actions

export default chatSlice.reducer