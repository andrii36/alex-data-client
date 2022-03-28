import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DeleteProductModal from "./DeleteProductModal"
import EditItemSuccessModal from "./EditItemSuccessModal"
import { deleteProductThunk, getProductsThunk, setCurrentPage } from "../../actions/content-actions"
import { setShowDeleteModal } from "../../actions/modal-modes-actions"
import ContentList from "./ContentList"

const ContentListContainer = () => {
    const productList = useSelector(state => state.content.productList)
    const searchProduct = useSelector(state => state.content.searchProduct)
    const userRole = useSelector(state => state.auth.currentUser.role)
    const code = useSelector(state => state.content.code)
    const successModalMode = useSelector(state => state.modalModes.editItemSuccess)
    const showDeleteModal = useSelector(state => state.modalModes.showDeleteModal)
    const allProductsLoading = useSelector(state => state.content.allProductsLoading)
    const currentPage = useSelector(state => state.content.currentPage)
    const searchValue = useSelector(state => state.content.searchValue)
    const filterConfig = useSelector(state => state.content.filterConfig)
    const dispatch = useDispatch()
    const [deleteItemId, setDeleteItemId] = useState(null)
    
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [currentPage, searchValue, filterConfig])

    const handleShow = (id) => {
        dispatch(setShowDeleteModal(true))
        setDeleteItemId(id)
    }
    const handleClose = () => dispatch(setShowDeleteModal(false))
    const confirmDelete = () => {
        dispatch(deleteProductThunk(deleteItemId))
        dispatch(setShowDeleteModal(false))
    }
    if(productList.length == 0 && currentPage > 1){
        dispatch(setCurrentPage(currentPage - 1))
    }
    return(
        <div style={{minHeight: "70vh"}}>
            <ContentList handleShow={handleShow} allProductsLoading={allProductsLoading} productList={productList} userRole={userRole} searchProduct={searchProduct}/>
            {showDeleteModal && <DeleteProductModal handleClose={handleClose} confirmDelete={confirmDelete}/>}
            {code === 0 && successModalMode && <EditItemSuccessModal created="created"/>}
        </div>
    )
}
export default ContentListContainer