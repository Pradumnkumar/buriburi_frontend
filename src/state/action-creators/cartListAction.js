import cartConst from '../constants/cartListConstants'
import axios from "axios";

const getCartList = (id) => async (dispatch) => {
    try {
        dispatch({ type: cartConst.CART_LIST_REQUEST })

        const { data } = await axios.get(`/api/cart/${id}`);
        dispatch({
            type: cartConst.CART_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: cartConst.CART_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export default getCartList;