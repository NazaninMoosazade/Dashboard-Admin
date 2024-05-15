import React, {useEffect, useState} from 'react'
import AddNewProducts from '../AddNewProduct/AddNewProducts'
import ProductsTable from '../../ProductsTable/ProductsTable'


export default function Products() {

  const [allprodocts , setAllproducts] = useState([])

  useEffect(() => {
    getAllproduct()
   }, [])
 
   const getAllproduct = () => {
    fetch('http://localhost:8000/api/products')
    .then(res => res.json())
    .then(products => setAllproducts(products));
   }

  return (
   <>
       <AddNewProducts getAllproduct={getAllproduct}/>
       <ProductsTable allprodocts={allprodocts} getAllproduct={getAllproduct}/>
      
   </>
  )
}
