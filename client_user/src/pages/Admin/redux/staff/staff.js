import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staffs: [],
    selectedStaff: {},
    staffTemp: []
}

export const staffSlice = createSlice({
    name: "staffs",
    initialState,
    reducers: {
        fetchStaff: (state, action) => {
            state.staffs = action.payload
            state.staffTemp = action.payload
        },
        selectStaff: (state, action) => {
            state.selectedStaff = action.payload
        },
        updateStaffs: (state, action) => {
            const { id, staff } = action.payload
            const indexStaff = state.staffs.findIndex(item => item._id === id)
            if (indexStaff === -1)
                return
            state.staffs[indexStaff] = staff
            state.staffTemp[indexStaff] = staff
        },
        addStaff: (state, action) => {
            const { staff } = action.payload
            state.staffs.push(staff)
            state.staffTemp.push(staff)
        },
        deleteStaff: (state, action) => {
            const { id } = action.payload
            const newStaffs = state.staffs.filter(item => item._id !== id)
            state.staffs = newStaffs
            state.staffTemp = newStaffs
        }

    }
})

export const { fetchStaff, selectStaff, updateStaffs, addStaff, deleteStaff } = staffSlice.actions
export default staffSlice.reducer