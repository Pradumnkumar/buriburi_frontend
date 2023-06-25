import productConst from '../constants/productDetailsConstants.js'

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case productConst.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case productConst.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case productConst.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
            
        default:
            return state
    }
}

export default productDetailsReducer;