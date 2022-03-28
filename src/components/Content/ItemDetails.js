import s from './ItemDetails.module.css'
import { Col, Container, Row, Button, Alert, ButtonGroup } from "react-bootstrap"
import Loader from '../Common/Loader'
import { useState } from 'react'
import DeleteProductModal from './DeleteProductModal'
const ItemDetails = (props) => {

    const [itemsToSell, setItemsToSell] = useState(1)
    const [itemsToAdd, setItemsToAdd] = useState(1)

    const { title, description, image, price, partNumber, category, itemsSold, available } = props.currentProduct

    const handleIncrementDecrement = (clickType, buttonType) => () => {
        if (clickType === '+' && itemsToSell < available && buttonType === 'sell') setItemsToSell(itemsToSell + 1)
        if (clickType === '-' && itemsToSell > 1 && buttonType === 'sell') setItemsToSell(itemsToSell - 1)
        if (clickType === '+' && buttonType === 'add') setItemsToAdd(itemsToAdd + 1)
        if (clickType === '-' && itemsToAdd > 1 && buttonType === 'add') setItemsToAdd(itemsToAdd - 1)
    }

    if (props.oneProductLoading) {
        return <Loader message='Data is loading...' />
    }
    if (props.code === 1) {
        return <h3>{props.message}</h3>
    }
    return (
        <Container style={{ padding: '18px' }}>
            <Alert show={props.code === 0 ? true : false} variant='success' onClose={props.onSuccessAlertClose} dismissible>
                Success! Item updated!
            </Alert>
            <Alert show={Number(available) > 0 ? false : true} variant='danger'>
                This item is not available right now
            </Alert>
            <div>
                <Row md={2}>
                    <Col>
                        <div>
                            <img style={{ width: '86%' }} src={image || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} />
                        </div>
                        <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-around' }}>

                            <div className={s.font17} style={{ color: Number(available) > 0 && 'green' }}>
                                {Number(available) > 0 ? `Available now ${available} items` : "Not available"}
                            </div>
                            <div className={s.font17} style={{ color: 'red' }}>
                                <span style={{ fontSize: '19px' }} >{itemsSold}</span> items sold
                            </div>
                        </div>
                        <div style={{ display: 'flex', margin: '50px auto' }}>
                            <div className={s.border}>
                                <label className={s.gray}>Price:</label>
                                <div className={s.font25}>${price}</div>
                            </div>
                            <div className={s.border}>
                                <label className={s.gray}>Part #:</label>
                                <div className={s.font25}>{partNumber}</div>
                            </div>
                            <div className={s.border}>
                                <label className={s.gray}>Category:</label>
                                <div className={s.font25}>{category}</div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1>{title}</h1>
                            <div>
                                {props.role === "admin" && <Button style={{margin: '5px'}} variant="outline-primary" onClick={props.onEditClick}>Edit</Button>}
                                {props.role === "admin" && <Button style={{margin: '5px'}} variant="outline-primary" onClick={props.onDeleteClick}>Delete</Button>}
                            </div>
                        </div>
                        <div style={{ marginTop: '30px' }}>{description}</div>
                    </Col>
                </Row>
                <Row>
                    <div style={{ height: '100px' }}>
                        <Row>
                            <Col>
                                <Row style={{ width: "23%", margin: "auto" }}>
                                    <ButtonGroup className="mb-2">
                                        <Button variant="outline-secondary" onClick={handleIncrementDecrement('-', 'sell')}>-</Button>
                                        <Button variant="outline-secondary" onClick={handleIncrementDecrement('+', 'sell')}>+</Button>
                                    </ButtonGroup>
                                </Row>
                                <Row>
                                    <Button disabled={Number(available) < 1} variant="outline-primary" style={{ width: '25%', margin: '15px auto' }} onClick={() => props.onPurchaseClick(itemsToSell)}>Sell {itemsToSell} item</Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{ width: "23%", margin: "auto" }}>
                                    <ButtonGroup className="mb-2">
                                        <Button variant="outline-secondary" onClick={handleIncrementDecrement('-', 'add')}>-</Button>
                                        <Button variant="outline-secondary" onClick={handleIncrementDecrement('+', 'add')}>+</Button>
                                    </ButtonGroup>
                                </Row>
                                <Row>
                                    <Button style={{ width: '25%', margin: '15px auto' }} 
                                        variant="outline-primary" 
                                        onClick={() => props.addItem({available: Number(available)+itemsToAdd}, props.productId)}>
                                            Add {itemsToAdd} item
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
            {props.showDeleteModal && <DeleteProductModal handleClose={props.handleClose} confirmDelete={props.confirmDelete}/>}
        </Container>
    )
}

export default ItemDetails