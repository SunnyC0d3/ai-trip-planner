import React from 'react'
import logo from '../../../public/logo.svg'
import { Button } from './Button'

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <img src={logo} alt="logo" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header