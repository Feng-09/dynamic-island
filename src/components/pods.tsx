// @ts-nocheck
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { features } from "@/features";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function Pods(props: any) {
    const [mini, setMini] = useState(true)
    const widgetTl: any = useRef()
    const width = window.screen.width
    const { contextSafe } = useGSAP()
    const router = useRouter()

    useGSAP(() => {
        gsap.set(".audio", { width: "176px", height: "34px" })
        gsap.set(".widget", { opacity: 0, pointerEvents: "none", translateY: "-30px" })
        gsap.set(".percent", { opacity: 0, pointerEvents: "none" })
        gsap.to(".audio", { width: "122px", duration: 0.3, ease: "back.out" })
        gsap.to(".audio", { width: "176px", duration: 0.3, delay: 0.3, ease: "back.out" })
    }, [])

    useEffect(() => {
        widgetTl.current = gsap.timeline({ paused: true })
        widgetTl.current.to(".audio", { width: "364px" || width - 48, height: "82px", borderRadius: "44px", padding: "18px", duration: 0.3, ease: "back.out" })
        widgetTl.current.to(".widget", { opacity: 1, translateY: 0, duration: 0.3, ease: "back.out" }, "0")
        widgetTl.current.to(".percent", { opacity: 1, duration: 0.3, ease: "back.out" }, "0")
        widgetTl.current.to(".pods", { width: "58px", height: "44px", duration: 0.3, ease: "back.out" }, "0")
        widgetTl.current.to(".bar", { width: "48px", height: "48px", duration: 0.3, ease: "back.out" }, "0")
    }, [])

    useEffect(() => {
        if (props.minimize) {
          widgetTl.current.reverse()
          setMini(true)
        } else if (props.minimize === false) {
          setMini(false)
        }
      }, [props.minimize])

    const widget = contextSafe(() => {
        mini ? widgetTl.current.play() : router.push('/connected')
        props.setMinimize(false)
    })

    return (
        <div className='w-full h-full max-h-fit flex justify-between items-center bg-black rounded-3xl py-1 px-3 audio fixed' onClick={widget}>
         <div className="flex items-center">
          <Image src={features[0].display} alt='pods' className='pods mr-1' />
          <Image src={features[0].content} alt="connected" className="widget" />
         </div>
         <div className="relative flex justify-center text-center items-center">
           <Image src={features[0].other} alt="bar" className="bar" />
           <p className="percent absolute text-[#4EEB77] text-base">80%</p>
         </div>
         
        </div>
    )
}