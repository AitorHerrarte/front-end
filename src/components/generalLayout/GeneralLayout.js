import React from 'react'
import NavGame from '../navGame/GeneralMenu'

const GeneralLayout = ({ children }) => {

  return (
    <div>
      <NavGame />
      {children}

    </div>
  )
}

export default GeneralLayout