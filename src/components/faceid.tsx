"use client"

import { features } from '@/features'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function FaceID() {
    const scanTl: any = useRef()
    const { contextSafe } = useGSAP()

    useGSAP(() => {
        gsap.set(".faceid", { width: "176px", height: "34px" })
        gsap.set(".face", { opacity: 0, translateY: "-30px" })
        gsap.to(".faceid", { width: "122px", duration: 0.3, ease: "back.out" })
    }, [])

    useEffect(() => {
        scanTl.current = gsap.timeline({ paused: true, repeat: 1, yoyo: true })
        scanTl.current.to(".faceid", { width: "153px", duration: 0.3, ease: "back.inOut" })
        scanTl.current.to(".faceid", { height: "153px", duration: 0.3, ease: "back.out" })
        scanTl.current.to(".face", { opacity: 1, translateY: 0, width: "64px", height: "64px",  duration: 0.3, ease: "back.out" }, "<")

        scanTl.current.to(".eyes", { height: "1px", duration: 0.2, delay: 1 })
        scanTl.current.to(".eyes", { height: "5.56px", duration: 0.2 })
    }, [])

    const verified = contextSafe(() => {
        gsap.to(".features", { filter: "hue-rotate(120deg) brightness(1.5)" })
    })

    setTimeout(() => {
        scanTl.current.play()
        setTimeout(verified, 1900)
    }, 300)

    return (
        <div className='w-fit h-fit max-h-fit flex flex-col justify-between items-center bg-black rounded-3xl py-1 px-3 faceid fixed'>
            <div className='face flex items-center justify-center relative p-[4.5rem]'>
                <Image src={features[3].ring} alt='ring' className='features absolute w-16 h-16' />
                <div className='absolute h-7 w-7 flex justify-center'>
                  <Image src={features[3].eyeright} alt='eyeright' className='features eyes absolute top-0 right-0' />
                  <Image src={features[3].eyeleft} alt='eyeleft' className='features eyes absolute top-0 left-0' />
                  <Image src={features[3].mouth} alt='mouth' className='features absolute bottom-0' />
                  <Image src={features[3].nose} alt='nose' className='features absolute top-0' />
                </div>
                
            </div>
        </div>
    )
}