'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigate(){
    const [show,setShow]=useState(false);
    return(
    <nav className=" bg-black flex">
<button onClick={()=>setShow(prev => !prev)} className="p-1  m-2 text-white rounded-lg text-4xl 
hover:bg-white hover:rounded-lg hover:text-black p-1">
 ☰
</button>

<Link href="/" className="flex items-center">
<Image src="/black.png"
alt="DSC"
width={70}
height={50}
/>
<span className="text-2xl font-bold text-white m-2">DSC</span>
</Link>

{
    show && 
    (
    <div className="flex items-center gap-3 flex-col absolute bg-white p-4 top-20 mx-2 rounded-lg">
        <Link href="/timer" className="hover:bg-black hover:rounded-lg hover:text-white p-1">Timer</Link>
        <Link href="/stopwatch" className="hover:bg-black hover:rounded-lg hover:text-white p-1">Stopwatch</Link>
        <Link href="/" className="hover:bg-black hover:rounded-lg hover:text-white p-1">Clock</Link>
        <Link href="/alarm" className="hover:bg-black hover:rounded-lg hover:text-white p-1">Alarm</Link>
      </div>
      
    )
}
    </nav>
     
    )
}
