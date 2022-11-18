import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import toRupiah from '@develoka/angka-rupiah-js';


function MenuModal(props) {
    const handleConfirm = () => {
        props.setConfirm(true)
    }
    const handleConfirm2 = () => {
        props.setConfirm(false)
    }
    return (
        <div>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {props.modal ?
                    <Card className='me-3 mt-3 p-2' style={{ width: '100%' }}>
                        <Card.Img variant="top" src={props.modal.image} />
                        <Card.Body>
                            <Card.Title >{props.modal.name} </Card.Title>
                            <Card.Text >
                                {toRupiah(props.modal.price, { dot: '.', floatingPoint: 0 })}
                            </Card.Text>
                        </Card.Body>
                        </Card> : null }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {handleConfirm2(); props.handleClose()}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleConfirm();props.addToCartHandler(props.modal.id, props.modal.price); props.handleClose()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MenuModal