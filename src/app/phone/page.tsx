"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import expandedapp from '../images/callexpanded.png'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useState } from "react"
import { Observer } from "gsap/all"

export default function PhoneExpanded() {
    const { contextSafe } = useGSAP()
    const [display, setDisplay] = useState(true)
    const router = useRouter()
    gsap.registerPlugin(Observer)

    const left = contextSafe(() => {
        gsap.to(".cont", { width: "50px", height: "50px", left: 0, borderRadius: "30px", duration: 0.3, ease: "back.out" })
        gsap.to(".cont", { y: "24px", xPercent: -50, duration: 0.3, delay: 0.3, ease: "back.out" })
        gsap.to(".cont", { width: "176px", height: "34px", duration: 0.3, delay: 0.6, ease: "back.out" })

        setTimeout(() => {
            setDisplay(false)
        }, 300)
        
        setTimeout(() => {
            router.push('/')
        }, 600)
    })

    const right = contextSafe(() => {
        gsap.to(".cont", { width: "50px", height: "50px", right: 0, borderRadius: "30px", duration: 0.3, ease: "back.out" })
        gsap.to(".cont", { y: "24px", duration: 0.3, delay: 0.3, ease: "back.out" })
        gsap.to(".cont", { width: "176px", height: "34px", duration: 0.3, delay: 0.6, ease: "back.out" })

        setTimeout(() => {
            setDisplay(false)
        }, 300)
        
        setTimeout(() => {
            router.push('/')
        }, 600)
    })

    Observer.create({
        type: "touch",
        onLeft: () => left(),
        onRight: () => right(),
    })


    return (
        <div className="w-screen h-screen fixed flex flex-col items-center bg">
        <p className="font-sf text-lg opacity-50 text-white fixed bottom-40 z-20">Swipe left or right to go back</p>
        <div className="fixed w-screen h-screen bg-black top-0 flex justify-center items-center cont">
            {
                display ? (
                    <Image src={expandedapp} alt="phone expanded" className="rounded-[2rem] shadow shadow-white" />
                ) : null
            }            
        </div>
        </div>
    )
}