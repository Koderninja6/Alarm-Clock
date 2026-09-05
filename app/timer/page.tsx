'use client';
import { useState,useEffect, useRef } from "react";
import Link from "next/link";

export default function Timer() {

  const [totalseconds, setTotalSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  alarmRef.current = new Audio("/timer.mp3");
}, []);
  


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
    setInitialSeconds(totalseconds);
    setStarted(true);
    setStopped(false);

    timeRef.current = setInterval(() => {

      setTotalSeconds(prev => {
        if (prev <=1){
          alarmRef.current?.play();
          clearInterval(timeRef.current!);
          timeRef.current=null;
          
          return 0;
        }
        return prev -1;
      });

    }, 1000);



  };
  const hours = Math.floor(totalseconds / 3600);
  const minutes = Math.floor((totalseconds % 3600) / 60);
  const seconds = totalseconds % 60;

  const percentage =
  initialSeconds === 0
    ? 0
    : (totalseconds / initialSeconds) * 100;


  return (
    <div className="bg-black text-white h-screen flex flex-col items-center">
      
      <h1 className="text-7xl font-bold flex justify-center mb-4">Timer</h1>
      <div className="w-full max-w-2xl h-4 bg-gray-700 rounded-full overflow-hidden">
  <div
    className="h-full bg-red-600 transition-all duration-1000"
    style={{ width: `${percentage}%` }}
  />
</div>
      <div className="flex justify-center ">
        <div className="flex justify-between justify-center
        w-250 m-5">
          <div className="mr-18">
            <h1 className="text-6xl font-bold my-4 justify-center flex ml-15">Hours:</h1>
            <p className=" w-full border-2 rounded-lg  border-white font-bold text-7xl mx-10 my-5 flex justify-center p-15"
            >
              {String(hours).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2 ml-4">
              
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev-3600))} className="w-15 py-3  bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  -
                </button>
                <button onClick={()=>setTotalSeconds(prev =>Math.max(0, prev-36000))} className="w-15 py-3  bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  - 10
                </button>
              

              
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev+3600))} className="w-15 ml-2 py-3  bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  +
                </button>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev+36000))} className="w-15 py-3 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  + 10
                </button>
              
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-6xl font-bold ml-5 my-4">Minutes:</h1>
            <p className="border-2 rounded-lg  border-white font-bold text-7xl  my-5 flex justify-center p-15">
              {String(minutes).padStart(2, "0")}
            </p>
            <div className="flex items-center">
              <div>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev-60))} className="w-15 py-3 ml-2 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  -
                </button>
                <button onClick={()=>setTotalSeconds(prev =>Math.max(0, prev-600))} className="w-15 py-3 m-2 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  - 10
                </button>
              </div>

              <div>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev+60))} className="w-15 py-3 m-2 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  +
                </button>
                <button onClick={()=>setTotalSeconds(prev =>Math.max(0, prev+600))} className="w-15 py-3 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  + 10
                </button>
              </div>
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-6xl font-bold ml-7 my-4">Seconds:</h1>
            <p className="border-2 rounded-lg border-white font-bold text-7xl ml-10 my-5 flex items-center justify-center p-15">
              {String(seconds).padStart(2, "0")}
            </p>
            <div className="flex items-center">
              <div>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev-1))} className="w-15 py-3 ml-12 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  -
                </button>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev-10))} className="w-15 py-3 m-2 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  - 10
                </button>
              </div>

              <div>
                <button onClick={()=>setTotalSeconds(prev =>Math.max(0, prev+1))} className="w-15 py-3 m-2 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  +
                </button>
                <button onClick={()=>setTotalSeconds(prev => Math.max(0,prev+10))} className="w-15 py-3 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                  + 10
                </button>
              </div>
            </div>
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

        </div>
        :
        <button onClick={Start} className="w-100 py-3 m-5 bg-red-700 rounded-lg text-xl 
hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
          Start
        </button>
      }
    </div >

  );
}
