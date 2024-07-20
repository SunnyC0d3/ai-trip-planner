import React from 'react'
import { Button } from './Button'

function Hero({ title, shortDescription }) {
    return (
        <div className="flex flex-col items-center justify-center mx-56 gap-9 text-center">
            <h1 className="font-extrabold text-[50px] mt-16">{title}</h1>
            <p className="text-xl text-gray-500">{shortDescription}</p>
            <Button>Get started, it's free.</Button>
        </div>
    )
}

export default Hero