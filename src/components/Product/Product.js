import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

import Rating from './Rating'
import { useDispatch } from "react-redux"
import {cartActions} from "../../store/cartSlice"


function Product({ product }) {

    const dispatch = useDispatch();
    const [focus, setFocus] = useState(false);

    const addToCartHandler = () => {
        console.log('IN ADD TO CART')
        dispatch(cartActions.addItem(product));
    }

    const focusHandler = () => {
        setFocus(true);
    }

    const removeFocusHandler = () => {
        setFocus(false);
    }

    return (
        <Card onMouseEnter={focusHandler} onMouseLeave={removeFocusHandler} className="my-3 p-3 rounded">
            <Link to={`product/${product.id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`product/${product.id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    ₹{product.price}
                </Card.Text>
            </Card.Body>

            {focus && <Button className='btn-block' disabled={product.countInStock === 0} type='button' onClick={addToCartHandler}>Add to cart</Button>}
        </Card>
    )
}

export default Product;
