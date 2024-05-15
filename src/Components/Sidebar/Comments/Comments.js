import React, { useEffect, useState } from 'react'
import ErorBox from '../ErorBox/ErorBox'
import DetailsModal from '../../DateailcModal/DetailsModal'
import DeleteModal from '../../DeleteModal/DeleteModal'

import './Comments.css'

export default function Comments() {

  const [allComments, setAllComments] = useState([])
  const [isShowDetailModal , setIsShowDetailModal] = useState(false)
  const [isShowDeletelModal , setIsShowDeletelModal] = useState(false)
  const [isShowAccseptModal , setIsShowAccseptModal] = useState(false)
  const [maqinCommnetBody , setMainCommentBody] = useState('')
  const [commentsID, setcommentID] = useState(null)
  
  

  useEffect(() => {
    getAllcommnets()
  },[])

  function getAllcommnets () {
    fetch('http://localhost:8000/api/comments')
    .then(res => res.json())
    .then((comments) => setAllComments(comments))
  }
  

  const closedetaiModal = () => setIsShowDetailModal(false)
  const closeDeleteModal = () => setIsShowDeletelModal(false)
  

 const closeAccseptModal = () => setIsShowAccseptModal(false)

 const accseptCommment = () => {
 
  fetch(`http://localhost:8000/api/comments/accept/${commentsID}`, {
    method: 'POST'
  }).then(res => res.json())
  .then(resualt => {
    console.log(resualt);
    setIsShowAccseptModal(false)
    getAllcommnets()
  })
 }

  const deletcommnet = () => {
    fetch(`http://localhost:8000/api/comments/${commentsID}` , {
      method: 'DELETE'
    }).then(res => res.json())
    .then(resualt => {
      console.log(resualt);
      setIsShowDeletelModal(false)
      getAllcommnets()
    })
  }
 

  return (
    <div className='cms-main'>

      <h1 className='cms-title'>لیست کامنت</h1>
   
    {
      allComments.length ? (
        <table className='cms-table'>
        <thead>
      <tr>
        <th>اسم کاربر</th>
        <th>محصول</th>
        <th>کامنت</th>
        <th>تاریخ</th>
        <th>ساعت</th>
      </tr>
      </thead>
  
      <tbody>
  
      {
        allComments.map(comment => (
          <tr key={comment.id}>
          <td>{comment.userID}</td>
          <td>{comment.productID}</td>
          <td>
            <button onClick={() =>
             {
              setMainCommentBody(comment.body)
              setIsShowDetailModal(true)
              }}>دیدن متن</button></td>
          <td>{comment.date}</td>
          <td>{comment.hour}</td>
          <td>
            <button onClick={() => 
            {
              setIsShowDeletelModal(true)
              setcommentID(comment.id)
            }
            }>حذف</button>
            <button>پاسخ</button>

            {
              comment.isAccept === 0 && (
                <button onClick={() =>
                  { setIsShowAccseptModal(true)
                    setcommentID(comment.id)
                  }}>تایید</button>
              )
            }

           
          </td>
          </tr>
        ))
      }
    
      </tbody>
  
      </table>
      ) : (
        <ErorBox msg={"هیچ کامنتی یافت نشد"}/>
      )
    }
    
   {
    isShowDetailModal && (
      <DetailsModal onHide={closedetaiModal}>
      <p className='text-modal'>
        {maqinCommnetBody}
      </p>
      <button className='text-modal-close-btn' onClick={closedetaiModal}>بستن</button>
      </DetailsModal>
    )
   }

  {
    isShowDeletelModal && (
      <DeleteModal
      title="آیا از حذف اطمینان دارید؟"
      cancelAction={closeDeleteModal}
      submitAction={deletcommnet}/>
    )
  }

   
   {
    isShowAccseptModal && (
      <DeleteModal
      title="آیا از تایید اطمینان دارید؟"
      cancelAction={closeAccseptModal}
      submitAction={accseptCommment}
      />
 
    )
   }

    </div>
  )
}
