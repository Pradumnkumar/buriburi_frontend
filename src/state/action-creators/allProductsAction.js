import allProductConst from '../constants/allProductsConstants.js'
import axios from "axios";

const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: allProductConst.PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products/')
        dispatch({
            type: allProductConst.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: allProductConst.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export default listProducts;