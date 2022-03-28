import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import EditItemSuccessModal from './EditItemSuccessModal'
import { clearCurrentProductAC, clearMessageAndCode, deleteProductThunk, getProductByIdThunk, purchaseProductThunk, updateProductThunk } from '../../actions/content-actions'
import ItemDetails from './ItemDetails'
import { Navigate } from "react-router"
import { setShowDeleteModal } from "../../actions/modal-modes-actions"

const ItemDetailsContainer = (props) => {

    const currentProduct = useSelector(state => state.content.currentProduct)
    const role = useSelector(state => state.auth.currentUser.role)
    const code = useSelector(state => state.content.code)
    const message = useSelector(state => state.content.message)
    const successModalMode = useSelector(state => state.modalModes.editItemSuccess)
    const oneProductLoading = useSelector(state => state.content.oneProductLoading)
    const isAuthorised = useSelector(state => state.auth.isAuthorised)
    const showDeleteModal = useSelector(state => state.modalModes.showDeleteModal)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const productId = location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getProductByIdThunk(productId))
        return () => {
            dispatch(clearCurrentProductAC())
            dispatch(clearMessageAndCode())
        }
    }, [])

    const onDeleteClick = () => {
        dispatch(setShowDeleteModal(true))
    }
    const handleClose = () => dispatch(setShowDeleteModal(false))
    const confirmDelete = () => {
        dispatch(deleteProductThunk(productId))
        dispatch(setShowDeleteModal(false))
        navigate('/')
    }
    const onEditClick = () => navigate(`/item-details/${productId}/edit`)
    const onPurchaseClick = (sellAmount) => dispatch(purchaseProductThunk(productId, sellAmount))
    const onSuccessAlertClose = () => dispatch(clearMessageAndCode())

    if(!isAuthorised){
        return <Navigate to='/login'/>
    }
    return(
        <>
            <ItemDetails currentProduct={currentProduct} oneProductLoading={oneProductLoading} onSuccessAlertClose={onSuccessAlertClose}
            code={code} message={message} role={role} onEditClick={onEditClick} onDeleteClick={onDeleteClick} onPurchaseClick={onPurchaseClick}
            productId={productId} addItem={(formData, productId) => dispatch(updateProductThunk(formData, productId))}
            handleClose={handleClose} confirmDelete={confirmDelete} showDeleteModal={showDeleteModal}/>
            {code === 0 && successModalMode && <EditItemSuccessModal updated="updated"/>}
        </>
    )
}

export default ItemDetailsContainer