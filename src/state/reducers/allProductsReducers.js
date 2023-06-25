import allProductConst from '../constants/allProductsConstants.js'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case allProductConst.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case allProductConst.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case allProductConst.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}