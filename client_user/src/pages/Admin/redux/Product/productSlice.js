import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectProduct: {},
    productTemps: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload
            state.productTemps = action.payload
            state.selectProduct = {}
        },
        addProduct: (state, action) => {
            const newProduct = action.payload
            state.products.push(newProduct)
            state.productTemps.push(newProduct)
        },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload
            const products = state.products.map(item => {
                if (item._id === updatedProduct._id) {
                    return updatedProduct
                }
                return item
            })
            state.products = products
            state.productTemps = products
        },
        selectedProduct: (state, action) => {
            state.selectProduct = action.payload
        },
        filterProduct: (state, action) => {
            const { cate, supplier } = action.payload
            state.productTemps = state.products.filter(item => {
                if (cate == "1" && supplier == "1") return true
                if (cate == "1") return item.supplier._id == supplier
                if (supplier == "1") return item.category._id == cate
                return (item.category._id == cate) && (item.supplier._id == supplier)
            })
        }, deleteProduct: (state, action) => {
            state.products = state.products.filter(item => item._id != action.payload)
            state.productTemps = state.products.filter(item => item._id != action.payload)
        },
        filterProductPrice: (state, action) => {
            const [minPrice, maxPrice] = action.payload.split('-').map(Number);
            state.productTemps = state.products.filter(product => {
                if (maxPrice) {
                    return product.price >= minPrice && product.price <= maxPrice;
                }
                return product.price > minPrice;
            })
        },
        resetProduct: (state) => {
            state.selectProduct = {}
        },
        setCateInProduct: (state, action) => {
            const { id, name } = action.payload
            const newProducts = state.productTemps.map(item => {
                if (item.category._id === id) {
                    item.category.name = name
                }
                return item
            })
            state.productTemps = newProducts
            state.products = newProducts
        }
    }
})

export const { setProduct, selectedProduct, filterProduct, deleteProduct, filterProductPrice, resetProduct, updateProduct, addProduct, setCateInProduct } = productSlice.actions
export default productSlice.reducer