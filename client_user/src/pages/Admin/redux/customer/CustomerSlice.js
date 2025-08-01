import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState= {
    customers:[]
}

const customerSlice = createSlice({
    name:"customers",
    initialState:initialCustomerState,
    reducers:{
        fetchDataCustomer : (state,action)=>{
            state.customers = action.payload
        },
        changeBlock:(state,action)=>{
            const {id,status} = action.payload
            const index = state.customers.findIndex(item =>item._id ===id)
            if(index < 0) return
            state.customers[index].role = status
        }
    }
})

export const {fetchDataCustomer,changeBlock} = customerSlice.actions

export default customerSlice.reducer