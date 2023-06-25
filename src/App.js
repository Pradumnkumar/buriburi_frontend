import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import CartSideBar from './components/Cart/CartSideBar'
import Modal from './components/UI/Modal'

function App() {
  const [cartBar, setCartBar] = useState(false);
  // const routes = createBrowserRouter([
  //   {
  //     path: '/', element: <RootPage />, children: [
  //       { index: true, path: '', element: <HomeScreen />, loader: null },
  //       { path: 'product/:id', element: <ProductScreen />, loader: null},
  //       { path: 'cart', element: <CartScreen />, loader: null},
  //     ]
  //   },
  // ]);
  return (
    <Router>
      {cartBar && <Modal setCartBar={setCartBar}><CartSideBar setCartBar={setCartBar} /></Modal>}
      <Header setCartBar={setCartBar} />
      <main className='py-5'>
        <Container>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/resources/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
