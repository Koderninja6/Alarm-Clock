'use client';
import Link from "next/link";
import { useState, useRef, useEffect } from "react";


export default function Home() {
    
const [now,setNow]=useState(new Date());


    setInterval(() => {
        setNow(new Date());
    }, 1000);

   

    return (
        <div className="bg-black text-white h-screen flex flex-col ">
            
            <h1 className="text-7xl font-bold flex justify-center">Indian Standard Time</h1>
            <div className="flex justify-center">
                <div className="flex justify-between justify-center
        w-250 m-5">
                    <div>
                        <h1 className="text-6xl font-bold m-4">Hours:</h1>
                        <p className="border-2 rounded-lg  border-white font-bold text-7xl m-4 flex justify-center p-15"
                        >
                            {String(now.getHours()).padStart(2, "0")}


                        </p>
                    </div>
                    <div>
                        <h1 className="text-6xl font-bold m-4">Minutes:</h1>
                        <p className="border-2 rounded-lg  border-white font-bold text-7xl m-4 flex justify-center p-15">
                            {String(now.getMinutes()).padStart(2, "0")}
                        </p>
                    </div>
                    <div>
                        <h1 className="text-6xl font-bold m-4">Seconds:</h1>
                        <p className="border-2 rounded-lg border-white font-bold text-7xl m-4 flex items-center justify-center p-15">
                            {String(now.getSeconds()).padStart(2, "0")}

                        </p>
                    </div>


                </div>
            </div>


        </div>
    );
}
