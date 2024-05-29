"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { features } from "@/features";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AppleMusic(props: any) {
    const [mini, setMini] = useState(true)
    const widgetTl: any = useRef()
    const width = window.screen.width
    const { contextSafe } = useGSAP()
    const router = useRouter()

    useGSAP(() => {
        gsap.set(".musicisland", { width: "176px", height: "34px" })
        gsap.set(".widget", { opacity: 0, pointerEvents: "none", translateY: "-30px" })
        gsap.to(".musicisland", { width: "122px", duration: 0.3, ease: "back.out" })
        gsap.to(".musicisland", { width: "176px", duration: 0.3, delay: 0.3, ease: "back.out" })
    }, [])

    useEffect(() => {
        widgetTl.current = gsap.timeline({ paused: true })
        widgetTl.current.to(".musicisland", { width: "364px" || width - 48, height: "190px", borderRadius: "44px", padding: "22px", duration: 0.3, ease: "back.out" })
        widgetTl.current.to(".widget", { opacity: 1, translateY: 0, duration: 0.3, ease: "back.out" }, "0")
        widgetTl.current.to(".album", { width: "60px", height: "60px", duration: 0.3, ease: "back.out" }, "0")
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
        mini ? widgetTl.current.play() : router.push('/music')
        props.setMinimize(false)
    })

    return (
        <div className='w-full h-full max-h-fit flex flex-col justify-between items-center bg-black rounded-3xl py-1 px-3 musicisland fixed' onClick={widget}>
            <div className="flex w-full justify-between">
                <div className="flex">
                    <Image src={features[2].display} alt="album cover" className="album mr-1 w-6 h-6" />
                    <Image src={features[2].name} alt="song name" className="widget" />
                </div>
                <Image src={features[2].freq} alt="frequency" className="w-6 h-6" />
            </div>

            <Image src={features[2].progress} alt="progress" className="widget" />

            <Image src={features[2].controls} alt="controls" className="widget" />
        </div>
    )
}
