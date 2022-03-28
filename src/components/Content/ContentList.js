import { Col, Row } from "react-bootstrap"
import CardItem from "../Card/CardItem"
import Loader from '../Common/Loader'

const ContentList = ({ handleShow, productList, allProductsLoading, userRole, searchProduct }) => {

    //const currentPage = useSelector(state => state.content.currentPage)

    const renderItemsList = (itemsArray) => {
        return itemsArray.map((el) => {
            return <CardItem
                key={el._id} title={el.title}
                id={el._id} image={el.image}
                price={el.price} partNumber={el.partNumber}
                category={el.category} available={el.available}
                itemsSold={el.itemsSold}
            />
        })
    }

    if (allProductsLoading) {
        return <Loader message='Data is loading...' />
    }
    if (productList.length === 0 && !allProductsLoading) {
        return <h3>No products were found</h3>
    }
    return (
        <Row>
            <Row>
                <Col><h5>Part #</h5></Col>
                <Col><h5>Image</h5></Col>
                <Col><h5>Title</h5></Col>
                <Col><h5>Category</h5></Col>
                <Col><h5>Items available</h5></Col>
                <Col><h5>Items sold</h5></Col>
                <Col><h5>Price</h5></Col>
            </Row>
            {searchProduct.length > 0
                ? renderItemsList(searchProduct)
                : renderItemsList(productList)}
        </Row>
    )
}
export default ContentList