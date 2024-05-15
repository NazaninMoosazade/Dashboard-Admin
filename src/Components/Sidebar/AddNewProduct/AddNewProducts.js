import React, { useState } from 'react'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import './AddNewProducts.css'

export default function AddNewProducts({getAllproduct}) {

  const [newprodoctName , setNewprodoctName] = useState('')
  const [newprodoctPrice , setNewprodoctPrice] = useState('')
  const [newprodoctCount , setNewprodoctCount] = useState('')
  const [newprodoctImg , setNewprodoctImg] = useState('')
  const [newprodoctPopularity , setNewprodoctPopularity] = useState('')
  const [newprodoctSale, setNewprodoctSale] = useState('')
  const [newprodoctColors, setNewprodoctColors] = useState('')

  

  const newproductsInfos = {
   title:newprodoctName,
   price:newprodoctPrice,
   count:newprodoctCount,
   img:newprodoctImg,
   popularity:newprodoctPopularity,
   sale:newprodoctSale,
   colors:newprodoctColors
  }

 const addNewProduct = (event) => {
  event.preventDefault()

  fetch(`http://localhost:8000/api/Products` , {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newproductsInfos)
  }).then(resualt => {
      console.log(resualt);
      getAllproduct()
      empytiInput()
    })
 }

 function empytiInput () {
  setNewprodoctName('')
  setNewprodoctPrice('')
  setNewprodoctCount('')
  setNewprodoctImg('')
  setNewprodoctPopularity('')
  setNewprodoctSale('')
  setNewprodoctColors('')
 }

  return (
    <div className='products-main'>
    <h1 className='products-title'>افزودن محصول جدید</h1>
    <form action="#" className='add-products-form'>
      <div className='add-products-form-wraps'>

       <div className='add-products-form-group'>
        <MdOutlineDriveFileRenameOutline />
         <input type="text" placeholder='اسم محصول را بنویسید' className='add-products-input'
         value={newprodoctName} 
         onChange={(event) => setNewprodoctName(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
        <GrGallery/>
         <input type="text" placeholder='قیمت محصول را بنویسید' className='add-products-input'
         value={newprodoctPrice}
         onChange={(event) => setNewprodoctPrice(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
       <IoBagOutline/>
         <input type="text" placeholder='موجودی محصول را بنویسید' className='add-products-input'
         value={newprodoctCount}
         onChange={(event) => setNewprodoctCount(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
       <GrGallery/>
         <input type="text" placeholder='آدرس عکس محصول را بنویسید' className='add-products-input'
         value={newprodoctImg}
         onChange={(event) => setNewprodoctImg(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
       <GrGallery/>
         <input type="text" placeholder='میزان محبوبیت محصول را بنویسید' className='add-products-input'
         value={newprodoctPopularity}
         onChange={(event) => setNewprodoctPopularity(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
       <GrGallery/>
         <input type="text" placeholder='میزان فروش محصول را بنویسید' className='add-products-input'
         value={newprodoctSale}
         onChange={(event) => setNewprodoctSale(event.target.value)}/>
       </div>

       <div className='add-products-form-group'>
       <GrGallery/>
         <input type="text" placeholder='تعداد رنگ بندی محصول را بنویسید' className='add-products-input'
         value={newprodoctColors}
         onChange={(event) => setNewprodoctColors(event.target.value)}/>
       </div>

      </div>
      <button className='add-product-btn' onClick={addNewProduct}>ثبت محصول</button>
    </form>
    </div>
  )
}
