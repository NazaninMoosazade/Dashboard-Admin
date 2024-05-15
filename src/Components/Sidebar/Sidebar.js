import React from 'react'
import { MdHome } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoBag } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
     <h1 className='sidebar-title'>به داشبورد خود خوش آمدید</h1>
     <ul className="sidebar-links">
        <NavLink to="./">
            <MdHome className='icon'/>
            صفحه اصلی 
        </NavLink>

        <NavLink to="./products">
        <MdOutlineProductionQuantityLimits className='icon'/>   
        محصولات
        </NavLink>

        <NavLink to="./comments">
            <FaComment className='icon'/>
            کامنت ها
        </NavLink>

        <NavLink to="./users">
            <HiUsers className='icon'/>
            کاربران
        </NavLink>

        <NavLink to="./orders">
            <IoBag className='icon'/>
            سفارشات
        </NavLink>
        <NavLink to="./offs"> 
            <AiFillDollarCircle className='icon'/>
            تخفیفات
        </NavLink>
        



     </ul>
    </div>
  )
}
