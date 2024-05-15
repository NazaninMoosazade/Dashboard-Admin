import React, { useEffect, useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DateailcModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import {AiOutlineDollarCircle} from 'react-icons/ai'
import ErorBox from '../Sidebar/ErorBox/ErorBox'
import './ProductsTable.css'

export default function ProductsTable({ allprodocts , getAllproduct }) {

  const [isShowModal , setIshowModal] = useState(false)
  const [isShowDetailModal , setIsShowDetailModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)
  const [productID, setProductID] = useState(null)
  const [mainproductInfo , setMainproductInfo] = useState({})

  const [productNewTitle, setProductNewTitle] = useState("")
  const [productNewPrice, setProductNewPrice] = useState("")
  const [productNewCount, setProductNewCount] = useState("")
  const [productNewImg, setProductNewImg] = useState("")
  const [productNewPopularity, setProductNewPopularity] = useState("")
  const [productNewSale, setProductNewSale] = useState("")
  const [productNewColors , setProductNewColors] = useState("")




  const deleteModalCanselAction = () => {
   console.log("مدال کنسل شد");
   setIshowModal(false)
  }

  const deleteModalSubmitlAction = () => {
    console.log("مدال تایید شد");
    console.log(productID);
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method:'DELETE',
    }).then(res => res.json())
    .then(result => {
      setIshowModal(false)
    })
    getAllproduct()
   }

   const closeDatailModal = () => {
    console.log("مدال جزئیات بسته شد");
    setIsShowDetailModal(false)
   
   }

   const updateProductInfos = (event) => {
    event.preventDefault()

    const productsNewInfos = {
      title:productNewTitle,
      price:productNewPrice,
      count:productNewCount,
      img:productNewImg,
      popularity:productNewPopularity,
      sale:productNewSale,
      colors:productNewColors
    }

    fetch(`http://localhost:8000/api/products/${productID}`, {
      method:'PUT',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(productsNewInfos)
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      getAllproduct()
      setIsShowEditModal(false)
    })

    
   }


  return (
    <>
   
   {
      allprodocts.length ? (
         <table className='products-table'>
         <thead>
         <tr className='products-table-heading-tr'>
         <th> عکس</th> 
         <th>اسم</th>
         <th>قیمت</th>
         <th>موجودی</th>
        </tr>
         </thead>
      
   
         <tbody>
   
        {
         allprodocts.map(products => (
         <tr className='products-tabale-tr' key={products.id}>
           <td>
               <img src={products.img} alt="oil-img" className='products-table-img'/>
           </td>
           <td>{products.title}</td>
           <td>{products.price}</td>
           <td>{products.count}</td>
           <td>
               <button className='products-table-btn' onClick={() => 
               {setIsShowDetailModal(true)
               setMainproductInfo(products)
               }}>جزئیات</button>


               <button className='products-table-btn' onClick={() =>
                {setIshowModal(true)
               setProductID(products.id)}}>حذف</button>

               <button className='products-table-btn' onClick={() => {
                  setIsShowEditModal(true)
                  setProductID(products.id)
                  setProductNewTitle(products.title)
                  setProductNewPrice(products.price)
                  setProductNewCount(products.count)
                  setProductNewImg(products.img)
                  setProductNewPopularity(products.popularity)
                  setProductNewSale(products.sale)
                  setProductNewColors(products.colors)
               }}>ویرایش</button>
   
           </td>
         </tr> 
         ))
        }
   
       </tbody>
   
       </table>
      ) : (
         <ErorBox msg={"هیچ محصولی یافت نشد"}/>
      )
   }

   
    {isShowModal && 
    <DeleteModal 
    title="آیا از حذف محصول اطمینان دارید؟"
    submitAction={deleteModalSubmitlAction} 
    cancelAction={deleteModalCanselAction} 
    />}

    {isShowDetailModal && <DetailsModal onHide={closeDatailModal}>
    <table className='cms-table'>
    <thead>
    <tr>
   <th>محدودیت</th>
   <th> فروش</th>
   <th> رنگ بندی</th>
   </tr>
   </thead>

  <tbody>
  <tr>
  <td>{mainproductInfo.popularity}%</td>
  <td>{mainproductInfo.sale}</td>
  <td>{mainproductInfo.colors}</td>
  </tr>
  </tbody> 
 </table>
   </DetailsModal>}
   
    {isShowEditModal && <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfos}>
    
    {/* {children} */}

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder='عنوان جدید  را وارد کنید' className='edit-product-input'
        value={productNewTitle} readOnly 
        onChange={(event) => setProductNewTitle(event.target.value)} />
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder='قیمت جدید  را وارد کنید' className='edit-product-input'
        value={productNewPrice}
        onChange={(event) => setProductNewPrice(event.target.value)} />
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder='موجودی جدید  را وارد کنید' className='edit-product-input'
        value={productNewCount}
        onChange={(event) => setProductNewCount(event.target.value)}/>
        
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder='آدرس کاور جدید  را وارد کنید' className='edit-product-input'
        value={productNewImg}
        onChange={(event) => setProductNewImg(event.target.value)}/>
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder='محبوبیت  جدید  را وارد کنید' className='edit-product-input' 
       value={productNewPopularity}
       onChange={(event) => setProductNewPopularity(event.target.value)}/>
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder=' میزان فروش جدید  را وارد کنید' className='edit-product-input' 
       value={productNewSale}
       onChange={(event) => setProductNewSale(event.target.value)}/>
    </div>

    <div className='edit-products-form-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" placeholder=' تعداد رنگ بندی  را وارد کنید' className='edit-product-input' 
       value={productNewColors}
       onChange={(event) => productNewColors(event.target.value)}/>
    </div>
    
    
    

    </EditModal>}

    
    </>
  )
}
