import cartConst from '../constants/cartListConstants'

export const cartListReducer = (state = { loading: true, cart: [] }, action) => {
  switch (action.type) {
    case cartConst.CART_LIST_REQUEST:
      return { loading: true, ...state.products }

    case cartConst.CART_LIST_SUCCESS:
      return { loading: false, cart: action.payload }

    case cartConst.CART_LIST_FAIL:
      return { loading: false, error: action.payload }

    case cartConst.UPDATE_CART:
      const { productId, quantity } = action.payload;
      return {
        loading: false,
        cart:
        {
          ...state,
          cart: state.cart.map((item) =>
            item.product._id === productId
              ? { ...item, qty: quantity }
              : item
          ),
        }
      };

    case cartConst.ADD_TO_CART:
      const { product, qty } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        return {
          loading: false,
          cart: {
            ...state,
            cart: state.cart.map((item) =>
              item.product._id === product._id
                ? { ...item, qty: item.qty + qty }
                : item
            ),
          }
        };
      }
      else {
        return {
          loading: false,
          cart: {
            ...state,
            cart: [...state.cart, { product, qty }],
          }
        };
      }

    default:
      return state
  }
}