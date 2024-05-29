"use client"

import { useState } from 'react'
import signal from '../../public/Signal.png'
import battery from '../../public/Battery.png'
import weather from '../../public/weather.png'
import bluetooth from '../../public/bluetooth.svg'
import applemusic from '../../public/applemusic.jpg'
import faceid from '../../public/faceid.png'
import Pods from '@/components/pods';
import Phone from '@/components/phone';
import AppleMusic from '@/components/applemusic'
import FaceID from '@/components/faceid'
import Image from 'next/image';
import { features } from '@/features';

export default function Home() {
  const [minimize, setMinimize] = useState()
  const [islandApp, setIslandApp] = useState("bluetooth")

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0')
  let time: string;

  if (hours > 12) {
    time = (hours - 12) + ':' + minutes;
  } else {
    time = hours + ':' + minutes;
  }

  const dayNo = now.getDay();
  const currDate = now.getDate();
  let day: string = "";

  switch (dayNo) {
    case 0:
        day = "Sun";
        break;
    case 1:
        day = "Mon";
        break;
    case 2:
        day = "Tue";
        break;
    case 3:
        day = "Wed";
        break;
    case 4:
        day = "Thur";
        break;
    case 5:
        day = "Fri";
        break;
    case 6:
        day = "Sat";
        break;
}

const today = day + ' ' + currDate;

  return (
    <main className="w-screen h-screen bg-cover p-6 flex flex-col items-center">
      <div className='fixed flex justify-between items-center w-full px-6 h-6 mt-1 z-10'>
        <p className='font-sf text-white font-semibold text-md'>{time}</p>
        <div className='flex gap-x-1'>
          <Image src={signal} alt='/' />
          <Image src={battery} alt='/' />
        </div>
      </div>
      <Island minimize={minimize} setMinimize={setMinimize} islandApp={islandApp} />
      
      <div className='flex flex-col my-36 items-center z-10'>
        <div className='flex justify-between gap-x-2 w-fit'>
          <p className='font-sf text-white font-semibold text-lg'>{today}</p>
          <Image src={weather} alt='/' />
          <p className='font-sf text-white font-semibold text-lg'>100%</p>
        </div>
        <h1 className='font-sf text-white font-semibold text-[5.65625rem] leading-[6.75rem]'>{time}</h1>
      </div>

      <div className='font-sf text-base opacity-50 text-white'>
        <p>Click on App icons to access different islands</p>
        <p>Click on island to focus</p>
        <p>Click on screen to minimize island</p>
        <p>Click on expanded island to view app page</p>
      </div>

      <Apps setIslandApp={setIslandApp} />

      <div className='w-screen h-screen opacity-0 fixed' onClick={() => {setMinimize(true)}}></div>
    </main>
  );
}

function Island(props: any) {
    return (
    <div className="bg-black rounded-3xl w-fit h-fit fixed island flex justify-center items-start z-20">
      {
        props.islandApp === "phone" ? (<Phone minimize={props.minimize} setMinimize={props.setMinimize} islandApp={props.islandApp} />)
        : props.islandApp === "music" ? (<AppleMusic minimize={props.minimize} setMinimize={props.setMinimize} />)
        : props.islandApp === "bluetooth" ? (<Pods minimize={props.minimize} setMinimize={props.setMinimize} />)
        : props.islandApp === "faceID" ? (<FaceID />)
        : null
      }
    </div>
  )
}

function Apps(props: any) {
  return (
    <div className='flex w-full items-center justify-between z-30 fixed bottom-40 p-6'>
      <div className='w-20 h-20 rounded-3xl flex justify-center items-center bg-white shadow shadow-slate-600' onClick={() => {props.setIslandApp("phone")}}>
        <Image src={features[1].display} alt='Phone' className='w-10 h-10' />
      </div>
      <Image src={applemusic} alt='Apple Music' className='w-20 h-20 rounded-3xl shadow shadow-slate-600' onClick={() => {props.setIslandApp("music")}} />
      <div className='w-20 h-20 rounded-3xl flex justify-center items-center bg-blue-600 shadow shadow-slate-600' onClick={() => {props.setIslandApp("bluetooth")}}>
        <Image src={bluetooth} alt='Bluetooth' className='w-10 h-10'  />
      </div>
      <Image src={faceid} alt='FaceID' className='w-20 h-20 rounded-3xl shadow shadow-slate-600' onClick={() => {props.setIslandApp("faceID")}} />
    </div>
  )
}