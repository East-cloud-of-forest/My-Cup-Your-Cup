// material, size, strow, price, image 
import { createSlice } from "@reduxjs/toolkit";

/*
const cupInfo = { 
    material : tumMetType, 
    size : tumSizeType, 
    strow : tumStrawType,
    price : summa
}
*/

const initialState = {
    material : "플라스틱",
    size : "중",
    strow : "사용",
    price : 20000,
    image : null
}

export const cupInfo = createSlice({
    name: 'cupInfo',
    initialState,
    reducers : {
        storeCupInfo: (state) => state
    }
})
