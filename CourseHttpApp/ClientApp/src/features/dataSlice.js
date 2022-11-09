import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: null,
    error:null
}
const token = localStorage.getItem("access_token")

/*
export const getInfo = createAsyncThunk(
    'info/getInfo',
    async (_,arg,{rejectWithValue,dispatch}) => {
        const {theme_id,type_id} = arg;
        try {
            const response = await fetch(`/api/Info?theme_id=${theme_id}&type_id=${type_id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            if (!response.ok) {
                throw new Error('Error in Server!!!')
            }
            if(type_id === 1){
                const data = response.json()
                return data
            }
            else{
                const data = response.json()
                return data
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
*/

export const getData = createAsyncThunk(
    'data/getData',
    async (_,{rejectWithValue}) => {
        try {
            const response = await fetch("/api/Course", {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            if(!response.ok){
                throw new Error('Error in Server!!!')
            }
            const data = response.json()
            localStorage.setItem("theme_id", data.value.progress.progress_theme_id)
            localStorage.setItem("type_id", data.value.progress.progress_type_id)
            console.log(data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state,action){
            state.data.push(action.payload)
        }
    },
    extraReducers:{
        [getData.pending]: state => {
            state.status = 'loading';
            state.error = null
        },
        [getData.fulfilled]: (state,action) => {
            state.status = 'resolved';
            state.data = action.payload
        },
        [getData.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload
        }
    }
})
export const {setData} = dataSlice.actions

export default dataSlice.reducer
