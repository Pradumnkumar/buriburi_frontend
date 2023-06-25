import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";
import CartCard from "../Cart/CartCard";
import CartPricingCard from "../Cart/CartPricingCard";
import getCartList from "../../state/action-creators/cartListAction";

// The following imports are for api support

function CartSideBar(props) {

    const setCartBar = () => {
        props.setCartBar(false);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartList(3))
    }, [dispatch]);

    
    const cartList = useSelector(state => state.cartList);
    const { error, loading, cart } = cartList;

    const [price, setPrice] = useState(cart?.orderItems?.reduce((partialSum, orderItem) => partialSum + (+orderItem.product.price) * (+orderItem.qty), 0));

    useEffect(() => {
        setPrice(cart?.orderItems?.reduce((partialSum, orderItem) => partialSum + (+orderItem.product.price) * (+orderItem.qty), 0));
    }, [cart]);

    return (
        <>
            {loading ? <Loader />
                : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    <>
                        <Row>
                            <Link to="/cart" className='btn btn-light my-3' onClick={setCartBar}>Go to Cart</Link>
                            <Col>
                                {cart.orderItems?.map((orderItem, idx) => (
                                    <Col key={orderItem._id} sm={12} md={12} lg={12} xl={12}>
                                        <CartCard input={orderItem} setPrice={setPrice} price={price} />
                                    </Col>
                                ))
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CartPricingCard price={price} discount={0} delivery={0} />
                            </Col>
                        </Row>
                    </>
            }
        </>
    );
}

export default CartSideBar;