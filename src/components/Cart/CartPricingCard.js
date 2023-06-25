import React from 'react'
import { Button, Card, Row, Col } from "react-bootstrap";


function CartPricingCard({ price, discount, delivery }) {
    return (
        <Card>
            <Card.Body md={9}>
                <Card.Title>Price Details</Card.Title>
                <Card.Body>
                    <Row>
                        <Col md={9}>Price</Col>
                        <Col md={3}>₹{price}</Col>
                    </Row>
                    <Row>
                        <Col md={9}>Discount</Col>
                        <Col md={3}>₹{discount}</Col>
                    </Row>
                    <Row>
                        <Col md={9}>Delivery Charges</Col>
                        <Col md={3}>₹{delivery}</Col>
                    </Row>
                    <Row>
                        <Col md={9}>Total Charges</Col>
                        <Col md={3}>₹{price + delivery - discount}</Col>
                    </Row>
                </Card.Body>
                <Row>
                    <Button className='btn-block' type='button'>Place Order</Button>
                </Row>
            </Card.Body>

        </Card>
    )
}

export default CartPricingCard