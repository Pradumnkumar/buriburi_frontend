import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product/Product";
import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import listProducts from "../state/action-creators/allProductsAction";

// The following imports are for api support

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
            <ol>
                <li>Fetch all the cart data and save in browser. Send it to backend when pressed order or entered/exited cart or page</li>
                <li>Create authentication</li>
                <li>Integrate cart to user</li>
                <li>Add function to Add to cart, save for later and remove</li>
                <li>Create method to have navigation and adding to cart without authentication</li>
                <li>Add payment portal</li>
                <li>DONE: On hovering on products have add to cart button</li>
            </ol>
        </>
    );
}

export default HomeScreen;