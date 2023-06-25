import { createSlice } from "@reduxjs/toolkit";

const uiState = { cartSidebar: false} 

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiState,
    reducers: {
        toggleCart(state){
            console.log(state,'Ye kaise')
            state.cartSidebar = !state.cartSidebar;
        },
    }
});

export default uiSlice;