import cartConst from '../constants/cartListConstants'
import axios from "axios";

const addToCart = (prod_id) => async (dispatch) => {
    
    try {

        const { data } = await axios.get(`/api/products/${prod_id}`)

        dispatch({
            type: cartConst.ADD_TO_CART,
            payload: [data, 1],
        })
    } catch (error) {
        dispatch({
            type: 1
        })
    }
}

export default addToCart;