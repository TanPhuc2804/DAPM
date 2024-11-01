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
           // Cập nhật danh sách đơn hàng từ payload
        },
        selectData: (state, action) => {
            state.selectedRow = action.payload; // Lưu dữ liệu dòng đã chọn vào selectedRow
        },
        updateOrderState: (state, action) => {
            const { id, stateOrder } = action.payload;
            const order = state.orders.find(order => order._id === id);
            if (order) {
                order.stateOrder = stateOrder; // Cập nhật trạng thái đơn hàng
            }
        },
        updateTemp: (state, action) => {
            state.temporder = action.payload;
        },
        filterOrder: (state, action) => {
           console.log(action)
        }
    },
})

export const { fetchData, selectData, updateOrderState, updateTemp, filterOrder } = orderSlice.actions

export default orderSlice.reducer