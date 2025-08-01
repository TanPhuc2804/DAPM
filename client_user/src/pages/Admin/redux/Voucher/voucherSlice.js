import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vouchers:[],
    selectVoucher: {}
}

const voucherSlice = createSlice({
    name:"voucher",
    initialState,
    reducers:{
        fetchDataVoucher:(state,action)=>{
            state.vouchers = action.payload
        },
        selectVoucher:(state,action)=>{
            state.selectVoucher = action.payload
        },
        addVoucher:(state,action)=>{
            state.vouchers.push({...action.payload,index:state.vouchers.length+1,key:action.payload._id})
        },
        updateVoucher:(state,action)=>{
            const {id,voucher}= action.payload
            const index = state.vouchers.findIndex(item=>item._id===id)
            if(index === -1) return
            state.vouchers[index]={...voucher,index:index,key:id}
        },
        deleteVoucher:(state,action)=>{
            const{id} = action.payload
            state.vouchers = state.vouchers.filter(item => item._id!=id)
        }
    } 
})
export const {selectVoucher,fetchDataVoucher,addVoucher,updateVoucher,deleteVoucher} = voucherSlice.actions
export default voucherSlice.reducer