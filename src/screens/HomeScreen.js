import React from "react"
import { Row, Col } from "react-bootstrap"

import { useLoaderData } from "react-router-dom";
import Product from "../components/Product/Product";
// import Loader from "../components/UI/Loader";
// import ErrorMessage from "../components/UI/ErrorMessage";
import axios from "axios";

// The following imports are for api support

function HomeScreen() {
    const products = useLoaderData();

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <ol>
                <li>Fetch all the cart data and save in browser. Send it to backend when pressed order or entered/exited cart or page</li>
                <li>Create authentication</li>
                <li>Integrate cart to user</li>
                <li>Create method to have navigation and adding to cart without authentication</li>
                <li>Add payment portal</li>
                <li>UI so when add to cart is pressed there is some response</li>
            </ol>
        </>
    );
}

export default HomeScreen;

export const getAllProducts = async ({request, params}) => {
    const response = await axios.get('http://localhost:8000/api/products');
    return response.data;
}