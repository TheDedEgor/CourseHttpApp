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
    async (params,{rejectWithValue,dispatch}) => {
        const theme_id = localStorage.getItem("theme_id")
        const type_id = localStorage.getItem("type_id")
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
            if (type_id === 1) {
                const data = await response.json()
                return data
            } else {
                const data = await response.json()
                return data
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
        /*dispatch(setData({params}))*/
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
