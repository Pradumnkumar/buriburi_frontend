import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import CartCard from "../components/Cart/CartCard";
import CartPricingCard from "../components/Cart/CartPricingCard";
import getCartList from "../state/action-creators/cartListAction";

// The following imports are for api support

function CartScreen(props) {

    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cartList);
    const { error, loading, cart } = cartList;
    useEffect(() => {
        dispatch(getCartList(3))
    }, [dispatch]);

    const [price, setPrice] = useState(0);

    useEffect(() => {
        setPrice(cart?.orderItems?.reduce((partialSum, orderItem) => partialSum + (+orderItem.product.price) * (+orderItem.qty), 0));
    }, [cart, loading]);

    return (
        <>
            {loading ? <Loader />
                : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    <Row>
                        <Col md={8} >
                            {cart?.orderItems?.map((orderItem, idx) => (
                                <Col key={orderItem._id} sm={9} md={9} lg={9} xl={12}>
                                    <CartCard input={orderItem} setPrice={setPrice} price={price} />
                                </Col>
                            ))
                            }
                        </Col>
                        <Col md={4}>
                            <CartPricingCard price={price} discount={0} delivery={0} />
                        </Col>
                    </Row>
            }
        </>
    );
}

export default CartScreen;