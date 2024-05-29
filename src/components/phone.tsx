// @ts-nocheck
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { features } from "@/features";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { memo } from "react";

export default function Phone(props: any) {
    const [call, setCall] = useState(true)
    const [answered, setAnswered] = useState(false)
    const [mini, setMini] = useState(false)
    const width = window.screen.width;
    const { contextSafe } = useGSAP()
    const acceptTl: any = useRef()
    const widgetTl: any = useRef()
    const router = useRouter()

    useEffect(() => {
      acceptTl.current = gsap.timeline({ paused: true })
      acceptTl.current.to(".ring", { height: "153px", padding: "22px", duration: 0.3, ease: "back.out" })
      acceptTl.current.to(".callicons", { opacity: 1, pointerEvents: "all", translateY: 0, duration: 0.3, ease: "back.out" }, "0")
      acceptTl.current.to(".accdec", { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "back.out" }, "0")

      acceptTl.current.to(".ring", { height: "34px", width: "188px", padding: "12px", duration: 0.3, ease: "back.out" })
      acceptTl.current.to(".callicons", { opacity: 0, pointerEvents: "none", translateY: "30px", duration: 0.3, ease: "back.out" }, "<")
      acceptTl.current.to(".show", { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "back.out" }, "<")
      acceptTl.current.to(".minWidget", { opacity: 1, pointerEvents: "all", duration: 0.3, ease: "back.out" }, "<")
    }, [])

    useEffect(() => {
      widgetTl.current = gsap.timeline({ paused: true })
      widgetTl.current.to(".ring", { height: "153px", width: "364px", padding: "22px", duration: 0.3, ease: "back.out" })
      widgetTl.current.to(".callicons", { opacity: 1, pointerEvents: "all", translateY: 0, duration: 0.3, ease: "back.out" }, "<")
      widgetTl.current.to(".show", { opacity: 1, pointerEvents: "all", duration: 0.3, ease: "back.out" }, "<")
      widgetTl.current.to(".minWidget", { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "back.out" }, "<")
    }, [])

    useEffect(() => {
      if (props.minimize && call) {
        acceptTl.current.seek(0.3)
        acceptTl.current.play()
          setMini(true)
      } else if (!props.minimize) {
        setMini(false)
      }
    }, [props.minimize])

    const accept = contextSafe(() => {
      if (call) {
        acceptTl.current.play()
      setTimeout(() => {
        acceptTl.current.pause()
      }, 300)
      setAnswered(true)
      }      
    })

    const widget = contextSafe(() => {
      if (call) {
        mini ? widgetTl.current.play() : null
        props.setMinimize(false)
      }      
    })

    const end = contextSafe(() => {
      gsap.to(".ring", { width: "176px", height: "34px", padding: "12px", duration: 0.3, ease: "back.out" })
      gsap.to(".show", { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "back.out" })
      gsap.to(".callicons", { opacity: 0, pointerEvents: "none", translateY: "30px", duration: 0.3, ease: "back.out" })

      setAnswered(false)
      setCall(false)
    })

    useGSAP(() => {
      gsap.set(".ring", { width: "176px", height: "34px" })
      gsap.set(".show", { opacity: 0, pointerEvents: "none" })
      gsap.set(".callicons", { opacity: 0, pointerEvents: "none", translateY: "30px" })
      gsap.set(".minWidget", { opacity: 0, pointerEvents: "none" })
      gsap.to(".ring", { width: "122px", duration: 0.3, ease: "back.out" })
      gsap.to(".ring", { width: "176px", duration: 0.3, delay: 0.3, ease: "back.out" })
      gsap.to(".ring", { width: "364px" || width - 48, height: "68px", borderRadius: "44px", duration: 0.6, delay: 0.3, ease: "back.out" })
      gsap.to(".show", { opacity: 1, pointerEvents: "all", duration: 0.3, delay: 0.3, ease: "back.out" })
    }, [])

    return (
        <div className='w-full h-full max-h-fit flex flex-col justify-between items-center bg-black rounded-3xl p-3 ring fixed' onClick={widget}>
          <div className="flex justify-between items-center w-full h-full mb-2 relative" onClick={() => {answered ? router.push('/phone') : null}}>
          <div className="flex show">
            <Image src={features[1].profile} alt="profile picture" className="w-12 h-12 mr-1" />
            <Image src={!answered ? features[1].content : features[1].answeredcont} alt="content" className="w-24 h-14" />
            <Image src={features[1].info} alt="info" className="absolute right-1 top-1 callicons"/>
          </div>
          <div className="flex show">
            <Image src={features[1].accept} alt="accept call" className="w-10 h-10 mr-3 accdec" onClick={accept} />
            <Image src={features[1].decline} alt="decline call" className="w-10 h-10 accdec" onClick={end} />
          </div>
          </div>
          <div>
            <Image src={features[1].callicons} alt="call icons" className="callicons" onClick={end} />
          </div>

            <div className="flex justify-between items-center w-full minWidget absolute top-2 px-2">
              <div className="flex">
                <Image src={features[1].display} alt="phone" className="mr-1" />
                <Timer answered={answered} islandApp={props.islandApp} />
              </div>      
              <Image src={features[1].callfreq} alt="call frequency" />        
            </div>

        </div>
    )
}

// eslint-disable-next-line react/display-name
const Timer = memo((props: any) =>  {
    const timeRef: any = useRef(null)

    let secs = 0
    let mins = 0

    useEffect(() => {
    }, [secs])

    if (props.answered) {
    const interv = setInterval(() => {
        secs++
        if (secs > 59) {
            mins++
            secs = 0
        }
        if (props.islandApp != "phone") {
          clearInterval(interv)
        }        
        timeRef.current.innerHTML = mins + ":" + Math.floor(secs).toString().padStart(2, '0')
    }, 1000)
    }

    if (secs > 59) {
        mins++
        secs = 0
    }

    return <div className="text-green-500 text-xs" ref={timeRef}></div>
})