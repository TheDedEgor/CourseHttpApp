import {configureStore} from '@reduxjs/toolkit'
import dataSlice from "../features/dataSlice";
import infoSlice from "../features/infoSlice";
export const store = configureStore({
    reducer:{
        data: dataSlice,
        info:infoSlice
    }
})