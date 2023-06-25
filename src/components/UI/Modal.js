import React from 'react'
import { createPortal } from 'react-dom'
import classes from './Modal.module.css'

function Backdrop(props) {

    return (
        <div onClick={props.setCartBar} className={classes.backdrop}>{props.children}</div>
    );
}

function ModalOverlay(props) {
    return (
        <div className={classes.modal}>{props.children}</div>
    );
}

function Modal(props) {
    const portal = document.getElementById('overlay');
    return (
        <>
            {createPortal(<Backdrop setCartBar={props.setCartBar} />, portal)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal)}
        </>
    )
}

export default Modal