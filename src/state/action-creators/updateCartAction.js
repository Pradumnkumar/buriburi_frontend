import cartConst from '../constants/cartListConstants'

const updateCart = (id, qty) => async (dispatch) => {
    
    try {
        dispatch({
            type: cartConst.UPDATE_CART,
            payload: [id, qty]
        })
    } catch (error) {
        dispatch({
            type: 1
        })
    }
}

export default updateCart;