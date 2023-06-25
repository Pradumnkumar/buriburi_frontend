import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ButtonGroup, Button, Card, Row, Col, Image, ListGroup } from "react-bootstrap";

import updateCart from "../../state/action-creators/updateCartAction"


const CartCard = (prop) => {

    const [numOrders, setNumOrders] = useState(prop.input.qty);
    const [errorMessage, setErrorMessage] = useState("");
    const product = prop.input.product;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateCart(product._id, numOrders))
    }, [dispatch, product._id, numOrders]);

    const reduceHandler = () => {
        if(+numOrders > 1){
            setNumOrders(prevState => prevState - 1);
            prop.setPrice(prop.price - +product.price);
            setErrorMessage("");
        }
    };

    const increaseHandler = () => {
        if(numOrders < product.countInStock){
            setNumOrders(prevState => parseInt(prevState) + 1);
            prop.setPrice(prop.price + +product.price);
            setErrorMessage("");
        }
        else{
            setNumOrders(product.countInStock);
        }
    };

    const quantityHandler = (event) => {
        if (+event.target.value > product.countInStock) {
            prop.setPrice(prop.price + (product.countInStock - numOrders) * (+product.price));
            setNumOrders(product.countInStock);
            setErrorMessage("Apologies, Not enough in Stock.");
        }
        else if(+event.target.value <= 0){
            // setNumOrders(1);
            // prop.setPrice(prop.price + (+event.target.value - numOrders) * (+product.price));
            setErrorMessage("")
        }
        else {
            prop.setPrice(prop.price + (+event.target.value - numOrders) * (+product.price));
            setNumOrders(event.target.value);
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
                                    <Button variant="secondary">REMOVE</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Card>);
};
export default CartCard;