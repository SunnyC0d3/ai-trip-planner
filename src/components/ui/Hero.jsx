import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'

function Hero({ title, shortDescription, btnText, href }) {
    return (
        <div className="flex flex-col items-center justify-center gap-9 text-center">
            <h1 className="font-extrabold text-[50px] mt-16">{title}</h1>
            <p className="text-xl text-gray-500">{shortDescription}</p>
            {
                href
                    ?
                    (
                        <Link to={href}>
                            <Button>{btnText}</Button>
                        </Link>
                    )
                    :
                    (
                        <Button>{btnText}</Button>
                    )
            }
        </div>
    )
}

export default Hero