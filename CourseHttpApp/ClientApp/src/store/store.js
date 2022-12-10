import {configureStore} from '@reduxjs/toolkit'
import infoSlice from "../features/infoSlice";
export const store = configureStore({
    reducer:{
        info:infoSlice
    }
})