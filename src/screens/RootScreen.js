import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import CartSideBar from '../components/Cart/CartSideBar';
import uiSlice from '../store/uiSlice';
import Modal from '../components/UI/Modal'

function RootScreen() {
    const ui = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const setCartBar = () => {
        dispatch(uiSlice.actions.toggleCart());
    }

    return (
        <>
            {ui.cartSidebar && <Modal setCartBar={setCartBar}><CartSideBar /></Modal>}
            <Header />
            <main className='py-5'>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default RootScreen