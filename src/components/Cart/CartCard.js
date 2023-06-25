import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import { cartActions } from "../../store/cartSlice";


const CartCard = (prop) => {

    const cart = useSelector(state => state.cart);
    const product = prop.product;
    const product_cart = cart.items.filter(item => item.id === product.id)[0];
    const [numOrders, setNumOrders] = useState(product_cart.qty);
    const [errorMessage, setErrorMessage] = useState("");
    console.log(cart);
    const dispatch = useDispatch();

    const removeHandler = () => {
        dispatch(cartActions.removeItem(product.id));
    }

    const reduceHandler = () => {
        if (+numOrders > 1) {
            setNumOrders(prevState => prevState - 1);
            dispatch(cartActions.decreaseQuantity(product.id));
            setErrorMessage("");
        }
    };

    const increaseHandler = () => {
        if (numOrders < product.countInStock) {
            setNumOrders(prevState => parseInt(prevState) + 1);
            dispatch(cartActions.increaseQuantity(product.id));
            setErrorMessage("");
        }
        else {
            setNumOrders(product.countInStock);
        }
    };

    const quantityHandler = (event) => {
        if (+event.target.value > product.countInStock) {
            const _id = product.id;
            const _qty = product.countInStock;
            setNumOrders(_qty);
            dispatch(cartActions.setQuantity({ _id, _qty }));
            setErrorMessage("Apologies, Not enough in Stock.");
        }
        else if (+event.target.value <= 0) {
            setErrorMessage("")
        }
        else {
            const _id = product.id;
            const _qty = event.target.value;
            setNumOrders(_qty);
            dispatch(cartActions.setQuantity({ _id, _qty }));
            setErrorMessage("");
        }
    };

    return (
        <Card>
            <Row>
                <Col md={3}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={9}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>{product.name}</ListGroup.Item>
                        <ListGroup.Item>₹{product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <ButtonGroup className="me-2">
                                    <Row>
                                        <Col className="p-0">
                                            <Button variant="primary" disabled={numOrders === 1} onClick={reduceHandler}>-</Button>
                                        </Col>
                                        <Col className="p-0">
                                            <input
                                                className="input-text form-control"
                                                type="number"
                                                pattern="[0-9]*"
                                                inputMode="numeric"
                                                min={1}
                                                max={product.countInStock}
                                                value={numOrders}
                                                onChange={quantityHandler}
                                                style={{ width: "110px" }}
                                            />
                                        </Col>
                                        <Col className="p-0">
                                            <Button disabled={product.countInStock === numOrders} variant="primary" onClick={increaseHandler}>+</Button>
                                        </Col>
                                    </Row>
                                </ButtonGroup>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <Button variant="secondary">Save for Later</Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={removeHandler}>REMOVE</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Card>);
};
export default CartCard;