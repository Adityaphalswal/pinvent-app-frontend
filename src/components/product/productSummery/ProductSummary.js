import React, { useEffect } from 'react'
import "./productSummary.scss"
import { AiFillDollarCircle } from 'react-icons/ai'
import {BsCart4,BsCartX} from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice'


// Icons
const earningIcon = <AiFillDollarCircle size={40} color='white'/>
const productIcon = <BsCart4 size={40} color='white'/>
const categoryIcon = <BiCategory size={40} color='white'/>
const outOfStockIcon = <BsCartX size={40} color='white'/>

const ProductSummary = ({products}) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const outOfStock = useSelector(selectOutOfStock)
  const category = useSelector(selectCategory)
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch,products])

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Status</h3>
      <div className="info-summary">
        <InfoBox icon={productIcon} title={`Total Product`} count={products.length} bgColor={`card1`}/>
        <InfoBox icon={earningIcon} title={`Total Store Value`} count={`$${totalStoreValue.toFixed(2)}`} bgColor={`card2`}/>
        <InfoBox icon={outOfStockIcon} title={`Out of Stock`} count={`${outOfStock}`} bgColor={`card3`}/>
        <InfoBox icon={categoryIcon} title={`All Categories`} count={category.length} bgColor={`card4`}/>
      </div>
    </div>
  )
}

export default ProductSummary