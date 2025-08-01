import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    orders: [],
    selectedRow: {},
    temporder: []
}


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        fetchData: (state, action) => {
            state.orders = action.payload; 
        },
        selectData: (state, action) => {
            state.selectedRow = action.payload; 
        },
        updateOrderState: (state, action) => {
            const {id,stateOrder} = action.payload
            const index = state.orders.findIndex((value)=>value._id === id)
            state.temporder[index].stateOrder = stateOrder
            state.orders[index].stateOrder = stateOrder
        },
        updateTemp: (state, action) => {
            state.temporder = action.payload;
        },
        filterOrder: (state, action) => {
            const {value} = action.payload
            if(value === 'defauld'){
                state.temporder = state.orders
                return
            }
            state.temporder = state.orders.filter((item)=>item.stateOrder === value) 
        }
    },
})

export const { fetchData, selectData, updateOrderState, updateTemp, filterOrder } = orderSlice.actions

export default orderSlice.reducer