import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    info:[],
    status:null,
    error:null
}
const token = localStorage.getItem("access_token")
export const fetchData = createAsyncThunk(
    'info/fetchData',
    async ({theme_id, type_id},{rejectWithValue}) =>{
        try{
            const response = await  fetch(`/api/Info?theme_id=${theme_id}&type_id=${type_id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            if (!response.ok) {
                throw new Error('Error in Server!!!')
            }
            const data = response.json()
            return data;
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)

const infoSlice = createSlice({
    name:'info',
    initialState,
    reducers:{
        setInfo(state,action){
            state.info.push(action.payload)
        }
    },
    extraReducers:{
        [fetchData.pending]: state => {
            state.status = 'loading';
            state.error = null
        },
        [fetchData.fulfilled]: (state,action) => {
            state.status = 'resolved';
            state.info = action.payload
        },
        [fetchData.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload
        }
    }
})

export const {setInfo} = infoSlice.actions;
export default infoSlice.reducer;