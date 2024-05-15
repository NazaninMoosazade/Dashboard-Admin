import React from 'react'
import './ErorBox.css'


export default function ErorBox({ msg }) {
  return (
    <div className='cms-empty-eror'>
        <h1>{ msg }</h1>
    </div>
  )
}
