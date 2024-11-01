import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    selectProduct:{},
    productTemps:[]
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct: (state,action)=>{
            state.products = action.payload
            state.productTemps = action.payload
            state.selectProduct = {}
        },
        selectedProduct:(state,action)=>{
            state.selectProduct=action.payload
        },
        filterProductCate:(state,action)=>{
            state.productTemps =  state.products.filter(item=> item.category._id == action.payload)
        },
        deleteProduct:(state,action)=>{
            state.products =  state.products.filter(item=> item._id != action.payload)
            state.productTemps =  state.products.filter(item=> item._id != action.payload)
        }
    }
})

export const  {setProduct,selectedProduct,filterProductCate,deleteProduct} = productSlice.actions
export default productSlice.reducer 