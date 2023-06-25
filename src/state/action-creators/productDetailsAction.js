import productConst from '../constants/productDetailsConstants.js'
import axios from "axios";

const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: productConst.PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: productConst.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConst.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export default listProductDetails;