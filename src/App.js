import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomeScreen, { getAllProducts } from './screens/HomeScreen'
import ProductScreen, { productLoader } from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import RootScreen from './screens/RootScreen';
import { populateCart } from './store/cartSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(populateCart(3));
  },[dispatch])
  const routes = createBrowserRouter([
    {
      path: '/', element: <RootScreen />, children: [
        { index: true, path: '', element: <HomeScreen />, loader: getAllProducts },
        { path: 'product/:product_id', element: <ProductScreen />, loader: productLoader },
        { path: 'cart', element: <CartScreen />, loader: null },
      ]
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
