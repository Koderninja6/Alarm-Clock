'use client';
import { useState, useRef } from "react";
import Link from "next/link";

export default function Home() {

  const [totalseconds, setTotalSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const Stop = () => {
    if (timeRef.current !== null) {
      clearInterval(timeRef.current!);
      timeRef.current = null;
    }
    setStopped(true);

  };



  const Reset = () => {
    window.location.reload();
  };

  const Start = () => {

    if (timeRef.current !== null) return;
    setStarted(true);
    setStopped(false);

    timeRef.current = setInterval(() => {
      // setSeconds(prev => {
      //   if (prev ===59){
      //     setMinutes(min => {
      //       if(min === 59){
      //         setHours(hour => hour+1);
      //         return 0;
      //       }
      //       return min+1;
      //     });
      //     return 0;
      //   }

      //   return prev+1;
      // });
      setTotalSeconds(prev => prev + 1);

    }, 1000);

    

  };
  const hours = Math.floor(totalseconds / 3600);
    const minutes = Math.floor((totalseconds % 3600) / 60);
    const seconds = totalseconds % 60;


  return (
    <div className="bg-black text-white h-screen flex flex-col">
      
      <h1 className="text-7xl font-bold flex justify-center">Stopwatch</h1>
      <div className="flex justify-center">
        <div className="flex justify-between justify-center
        w-250 m-5">
          <div>
            <h1 className="text-6xl font-bold m-4">Hours:</h1>
            <p className="border-2 rounded-lg  border-white font-bold text-7xl m-4 flex justify-center p-15"
            >
              {String(hours).padStart(2, "0")}
            </p>
          </div>
          <div>
            <h1 className="text-6xl font-bold m-4">Minutes:</h1>
            <p className="border-2 rounded-lg  border-white font-bold text-7xl m-4 flex justify-center p-15">
              {String(minutes).padStart(2, "0")}
            </p>
          </div>
          <div>
            <h1 className="text-6xl font-bold m-4">Seconds:</h1>
            <p className="border-2 rounded-lg border-white font-bold text-7xl m-4 flex items-center justify-center p-15">
              {String(seconds).padStart(2, "0")}
            </p>
          </div>


        </div>
      </div>
      {started ?
        <div>
          <button onClick={Reset} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
            Reset
          </button>
          {stopped ?
            <button onClick={Start} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
              Continue
            </button>
            :
            <button onClick={Stop} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
              Stop
            </button>
          }


          <button onClick={Start} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 opacity-0 hover:opacity-100 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
            Go-Crazy 10x
          </button>

        </div>
        :
        <div className="flex justify-center">
        <button onClick={Start} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
          Start
        </button>
        </div>
      }
    </div >

  );
}
