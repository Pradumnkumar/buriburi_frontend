import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

import Rating from '../components/Product/Rating'
import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import listProductDetails from '../state/action-creators/productDetailsAction'

function ProductScreen() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])
    return (
        <>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader />
                : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    (<Row>
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
                                            <Button className='btn-block' disabled={product.countInStock === 0} type='button' >Add to Cart </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)
            }
        </>
    )
}

export default ProductScreen;