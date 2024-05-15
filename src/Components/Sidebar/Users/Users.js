import React, { useEffect, useState } from 'react'
import ErorBox from '../ErorBox/ErorBox'
import DeletModal from '../../DeleteModal/DeleteModal'
import EditModal from '../../EditModal/EditModal'
import DetailModal from '../../DateailcModal/DetailsModal'
import {AiOutlineDollarCircle} from 'react-icons/ai'
import './Users.css'

export default function Users() {

  const [users , setUsers] = useState([])
  const [isShowDeletModal, setIsShowDeletModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [mainuserID , setMainUserID] = useState(null)
  const [mainuserInfos , setmainuserInfos] = useState({})

  const [userNewFirstName, setUserNewFirstName] = useState('')
  const [userNewLastName, setUserNewLastName] = useState('')
  const [userNewUserName, setUserNewUserName] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPhone, setUserNewPhone] = useState('')
  const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState('')
  const [userNewAddress, setUserNewAddress] = useState('')
  const [userNewScore, setUserNewScore] = useState('')
  const [userNewBuy, setUserNewBuy] = useState('')
  


  useEffect(()=>{
    getAllusers()
  } ,[])

  function getAllusers () {
    fetch(`http://localhost:8000/api/users/`)
    .then(res => res.json())
    .then(users => setUsers(users))
  }

  const closeDeletModal = () => setIsShowDeletModal(false)
  const closeEditeModal = () => setIsShowEditModal(false)
  const closeDetailModal = () => setIsShowDetailModal(false)


  const removeUser = () => {
    fetch(`http://localhost:8000/api/users/${mainuserID}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowDeletModal(false)
      getAllusers()
    })
    
  }

  const updateUser = (event) => {
  event.preventDefault()

  const userNewInfos = {
    firsname : userNewFirstName,
    lastname : userNewLastName,
    username : userNewUserName,
    password : userNewPassword,
    phone :  userNewPhone,
    city : userNewCity,
    email : userNewEmail,
    address : userNewAddress,
    score : userNewScore,
    buy : userNewBuy
  }

  fetch(`http://localhost:8000/api/users/${mainuserID}`, {
    method:'PUT',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(userNewInfos)
  }).then(res => res.json())
  .then(resualt => {
    console.log(resualt);
    setIsShowEditModal(false)
    getAllusers()
  })
  }


  return (
    <div className='cms-main'>
    <h1 className='cms-title'>لیست کاربران</h1>
    {
      users.length ? (
     <table className='cms-table'>
      <thead>
        <tr>
          <th>نام و نام خانوادگی</th>
          <th>یوزرنیم </th>
          <th> رمز عبور</th>
          <th> شماره تماس </th>
          <th>  ایمیل</th>
        </tr>
      </thead>

     <tbody>

      {
       users.map(user=> (

        <tr key={user.id}>
        <td>{user.firsname} {user.lastname}</td>
        <td> {user.username}</td>
        <td> {user.password}</td>
        <td> {user.password}</td>
        <td> {user.email}</td>
        <button onClick={() => 
        {setIsShowDeletModal(true)
          setMainUserID(user.id)
        }
        }>حذف</button>

        <button onClick={() => 
          {setmainuserInfos(user)
          setIsShowDetailModal(true)
          }
          }>جزئیات</button>


        <button onClick={() => {
          setIsShowEditModal(true)
          setMainUserID(user.id)
          setUserNewFirstName(user.firsname)
          setUserNewLastName(user.lastname)
          setUserNewUserName(user.username)
          setUserNewPassword(user.password)
          setUserNewPhone(user.phone)
          setUserNewCity(user.city)
          setUserNewEmail(user.email)
          setUserNewAddress(user.address)
          setUserNewScore(user.score)
          setUserNewBuy(user.buy)
        }}>ویرایش</button>

      </tr>
       ))
      }

     </tbody>

     </table>
      ) : (
        <ErorBox msg={"هیچ کاربری یافت نشد"}/>
      )
    }

   {
    isShowDeletModal && (
      <DeletModal
      title="آیا از حذف اطمینان دارید؟"
      cancelAction={closeDeletModal}
      submitAction={removeUser}
      />
    )
   }

   {
    isShowEditModal && (
      <EditModal
      onClose={closeEditeModal}
      onSubmit={updateUser}
      >

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='نام' value={userNewFirstName}
        onChange={(event) =>setUserNewFirstName(event.target.value) }/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='نام خانوادگی' value={userNewLastName}
       onChange={(event) => setUserNewLastName(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='نام کاربری' value={userNewUserName}
       onChange={(event) => setUserNewUserName(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='پسوورد کاربر' value={userNewPassword}
       onChange={(event) => setUserNewEmail(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='شماره تماس کاربر' value={userNewPhone}
       onChange={(event) => setUserNewPhone(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='محل زندگی کاربر(شهر)' value={userNewCity}
       onChange={(event) => setUserNewCity(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='ایمیل کاربر' value={userNewEmail}
       onChange={(event) => setUserNewEmail(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <textarea className='edit-user-info-input' placeholder='آدرس کاربر' value={userNewAddress}
       onChange={(event) => setUserNewAddress(event.target.value)}>

       </textarea>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='امتیاز کاربر در سایت' value={userNewScore}
       onChange={(event) => setUserNewScore(event.target.value)}/>
      </div>

      <div className='edit-user-info-input-group'>
       <span>
        <AiOutlineDollarCircle/>
       </span>
       <input type="text" className='edit-user-info-input' placeholder='میزان خرید کاربر' value={userNewBuy}
       onChange={(event) => setUserNewBuy(event.target.value)}/>
      </div>

      </EditModal>
    )
   }

  {
    isShowDetailModal && (
    <DetailModal
    onHide={closeDetailModal}
    >
    <table className='cms-table'>
    <thead>
    <tr>
    <th>شهر</th>
    <th> آدرس</th>
    <th> امتیاز </th>
    <th> میزان خرید </th>

    </tr>
    </thead>

    <tbody>
    <tr>
    <td>{mainuserInfos.city}</td>
    <td>{mainuserInfos.address}</td>
    <td>{mainuserInfos.score}</td>
    <td>{mainuserInfos.buy}</td>
    </tr>
    </tbody> 
    </table>
    </DetailModal>
    )
  }


    </div>
  )
}
