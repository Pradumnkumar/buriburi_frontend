import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartData = { items: [], totalPrice: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartData,
    reducers: {
        initCart(state, action) {
            const cart = action.payload.orderItems;
            if (cart) {
                const cartItems = cart.map((orderItems) => {
                    const product = orderItems.product;
                    const qty = orderItems.qty;
                    return {
                        ...product,
                        qty,
                    }
                });
                const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
                state.items = cartItems;
                state.totalPrice = totalPrice;
            }
        },
        addItem(state, action) {
            const new_item = action.payload;
            // Check if the item already exists
            const item = state.items.find((item) => item.id === new_item.id);
            if (!item) {
                state.items.push({
                    ...new_item,
                    qty: 1,
                });
                state.totalPrice += +new_item.price;
            }
            // If the item does not exist add the item with qty=1
            else {
                if (item.qty < item.countInStock) {
                    item.qty = item.qty + 1;
                    state.totalPrice += +item.price;
                }
            }
        },
        // If remove item button is pressed from cart screen
        removeItem(state, action) {
            const item_id = action.payload;
            const item = state.items.find((item) => item.id === item_id);
            if (item) {
                state.totalPrice = state.totalPrice - item.price * item.qty;
                state.items = state.items.filter((item) => item.id !== item_id);
            }
        },
        // If number is put directly into the input box
        setQuantity(state, action) {
            const { _id, _qty } = action.payload;
            const item = state.items.find((item) => item.id === _id);
            console.log(item);
            if (item) {
                const item_qty_set = (+_qty < +item.countInStock) ? +_qty : +item.countInStock;
                state.totalPrice += (+item_qty_set - +item.qty) * +item.price;
                item.qty = item_qty_set;
            }
        },
        increaseQuantity(state, action) {
            const item_id = action.payload;
            const item = state.items.find((item) => item.id === item_id);
            if (item) {
                item.qty = +item.qty + 1;
                state.totalPrice += +item.price;
            }
        },
        decreaseQuantity(state, action) {
            const item_id = action.payload;
            const item = state.items.find((item) => item.id === item_id);
            if (item) {
                item.qty = +item.qty - 1;
                state.totalPrice -= +item.price;
                if (+item.qty === 0) {
                    state.items = state.items.filter(item => item.id !== item_id);
                }
            }
        }
    }
});

export default cartSlice;
export const cartActions = cartSlice.actions;

export const populateCart = (user_id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:8000/api/cart/${user_id}`);
        dispatch(cartSlice.actions.initCart(response.data));
    }
}