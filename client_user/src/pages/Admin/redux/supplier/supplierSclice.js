import { createSlice } from "@reduxjs/toolkit";
const initalState = {
    suppliers: [],
    selectedSupplier: {},
    supplierTemp: []
}

const supplierSlice = createSlice({
    name: "supplier",
    initialState: initalState,
    reducers: {
        fetchDataSuppliers: (state, action) => {
            state.suppliers = state.supplierTemp = action.payload
        },
        selectedSupplier: (state, action) => {
            state.selectedSupplier = action.payload
        },
        addSupplier: (state, action) => {
            const supplier = action.payload
            state.suppliers.push({ ...supplier, index: state.suppliers.length + 1, key: supplier._id })
            state.supplierTemp.push({ ...supplier, index: state.suppliers.length + 1, key: supplier._id })

        },
        updateSupplier: (state, action) => {
            const { id, supplier } = action.payload
            const index = state.suppliers.findIndex(item => item._id === id)
            if(index ===-1) return
            state.suppliers[index] = {...supplier,index:index,key:id,_id:id }
            state.supplierTemp[index] = {...supplier,index:index,key:id,_id:id}
        },
        deleteSupplier: (state, action) => {
            const { id } = action.payload
            const newSupplier = state.suppliers.filter(item => item._id !== id)
            state.suppliers = state.supplierTemp = newSupplier
        }
    }
})

export const { fetchDataSuppliers, selectedSupplier, addSupplier, updateSupplier,deleteSupplier } = supplierSlice.actions
export default supplierSlice.reducer