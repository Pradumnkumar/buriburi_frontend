import React from "react";
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

import Rating from '../components/Product/Rating'
import cartSlice from "../store/cartSlice";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function ProductScreen() {

    const dispatch = useDispatch();
    const product = useLoaderData();

    const addToCartHandler = () => {
        dispatch(cartSlice.actions.addItem(product));
    }
    

    return (
        <>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card >
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>₹{product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button className='btn-block' disabled={product.countInStock === 0} type='button' onClick={addToCartHandler}>Add to Cart </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;

export const productLoader = async ({request, params}) => {
    const {product_id} = params;
    const product = await axios.get(`http://localhost:8000/api/product/${product_id}`);
    return product.data;
}