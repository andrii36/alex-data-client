import { Card, Image, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import s from './Card.module.css'

const CardItem = ({ partNumber, title, category, available, itemsSold, price, image, id }) => {

  const navigate = useNavigate()

  return (
    <Row style={{ padding: "10px", border: "black solid 0.5px" , height: '120px', margin: '8px'}}>
      <Col><NavLink to={`/item-details/${id}`}>{partNumber}</NavLink></Col>
      <Col><img src={image} style={{ width: "75%" }} /></Col>
      <Col>{title}</Col>
      <Col>{category}</Col>
      <Col>{available}</Col>
      <Col>{itemsSold}</Col>
      <Col>${price}</Col>
      {/* <Card style={{ margin: '9px auto', width: '80%' }}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate(`item-details/${props.id}`)}>
          <div>
            <Image height={150} src={props.image || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'} style={{ position: "relative" }} />
          </div>
          <div>
            <div className={s.card_title}>{props.title}</div>
            <div className={s.card_description}>{props.description}</div>
          </div>
        </div>
        <div className={s.card_bottom}>
          <div style={{ fontWeight: "600", margin: "auto", fontSize: "19px" }}>${props.price}</div>
          <div>
            {props.role === "admin"
              && <Button style={{ padding: 0 }} variant="outline-secondary" onClick={() => props.handleShow(props.id)}>Delete</Button>}
            <Button style={{ padding: 0 }} variant="outline-secondary" onClick={() => navigate(`/item-details/${props.id}`)}>Details</Button>
          </div>
        </div>
      </Card> */}
    </Row>
  )
}
export default CardItem