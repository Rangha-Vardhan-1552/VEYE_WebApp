import React, { useState } from 'react'
import SuccessPopup from './SuccessPopup'

export default function Services() {
const [isPopupVisible,setPopupVisible]=useState(false)
const showPopup=()=>setPopupVisible(true)
const hidePopup=()=>setPopupVisible(false)
  return (
    <div>
      <h2>Services Page</h2>
      <button onClick={showPopup}>Popup</button>
      {isPopupVisible && <SuccessPopup onClose={hidePopup}/>}
    </div>
  )
}
