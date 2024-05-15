import React, { useEffect } from 'react'
import './DateilsModal.css'

export default function DetailsModal({onHide, children}) {

    useEffect( () => {
        const checkkey = (event) => {
        if(event.keyCode === 27) {
            onHide()
        }
        }

        window.addEventListener('keydown' , checkkey)

        return () => window.removeEventListener('keydown' , checkkey)
    })


  return (
    <div className='modal-parent active'>
    <div className='details-modal'>
    {children}
    </div>
    </div>
  )
}


