import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigation } from 'react-router-dom'

import Loader from "../UI/Loader";
// import ErrorMessage from "../UI/ErrorMessage";
import CartCard from "../Cart/CartCard";
import CartPricingCard from "../Cart/CartPricingCard";
import uiSlice from "../../store/uiSlice";

// The following imports are for api support

function CartSideBar() {
    const cart = useSelector(state => state.cart);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const setCartBar = () => {
        dispatch(uiSlice.actions.toggleCart());
    }

    return (
        <>
            {navigation.state === "loading" ? <Loader />
                // : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    <>
                        <Row>
                            <Link to="/cart" className='btn btn-light my-3' onClick={setCartBar}>Go to Cart</Link>
                            <Col>
                                {cart.items.map((orderItem, idx) => (
                                    <Col key={orderItem.id} sm={12} md={12} lg={12} xl={12}>
                                        <CartCard product={orderItem} />
                                    </Col>
                                ))
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CartPricingCard price={cart.totalPrice} discount={0} delivery={0} />
                            </Col>
                        </Row>
                    </>
            }
        </>
    );
}

export default CartSideBar;