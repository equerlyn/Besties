import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import chatReducer from "./chatSlice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        user: userReducer,
        chat: chatReducer,
    },
})
export default store