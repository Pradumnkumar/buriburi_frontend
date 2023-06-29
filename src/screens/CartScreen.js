import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
// import ErrorMessage from "../components/UI/ErrorMessage";
import CartCard from "../components/Cart/CartCard";
import CartPricingCard from "../components/Cart/CartPricingCard";
import { useNavigation } from "react-router-dom";


// The following imports are for api support

function CartScreen(props) {

    const navigation = useNavigation();
    const cart = useSelector(state => state.cart);

    return (
        <>
            {navigation.state === "loading" ? <Loader />
                // : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    <Row>
                        <Col md={8} >
                            {cart.items.map((orderItem, idx) => (
                                <Col key={orderItem.id} sm={9} md={9} lg={9} xl={12}>
                                    <CartCard product={orderItem} />
                                </Col>
                            ))
                            }
                        </Col>
                        <Col md={4}>
                            <CartPricingCard price={cart.totalPrice} discount={0} delivery={0} />
                        </Col>
                    </Row>
            }
        </>
    );
}

export default CartScreen;