import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getSearchProductThunk } from '../../actions/content-actions'
import useDebounce from '../../hooks/useDebounce'
import InputText from '../Common/InputText'

const ContentHeader = ({ role, addProductClick }) => {

    const [searchPartNo, setSearchPartNo] = useState('')
    const dispatch = useDispatch()

    const partNoSearch = (partNumber) => {
        dispatch(getSearchProductThunk(partNumber))
    }

    const debouncedSearch = useDebounce(partNoSearch, 1000)

    const handleSearchChange = (e) => {
        setSearchPartNo(e.target.value)
        debouncedSearch(e.target.value)
    }

    return (
        <Row>
            <Col>
                {role === "admin"
                    && <Button style={{ width: "60%" }} variant="outline-primary" onClick={addProductClick}>Add item</Button>}
            </Col>
            <Col>
                <InputText
                    id="partNumberSearch" placeholder="Enter part number"
                    name="partNumberSearch" onChange={handleSearchChange} value={searchPartNo}
                />
            </Col>
        </Row>
    )
}
export default ContentHeader