'use client';
import { useState, useEffect, useRef } from "react";
import { SquarePen } from "lucide-react";

export default function Alarm() {
    const [selected, setSelected] = useState(true);
    const [selectedAlarms, setSelectedAlarms] = useState<number[]>([]);
    const alarmRef = useRef<HTMLAudioElement | null>(null);
    const [add, setAdd] = useState(false);
    const [totalseconds, setTotalSeconds] = useState(0);
    const [alarmsaved, setAlarmsaved] = useState<item[]>([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [meridianState, setMeridianState] = useState(false);

    const meridian = async (id: number, meridian: string) => {

        await fetch("/api/savealarms", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                meridian,
            })
        });

    };

    const update = async (id: number) => {

        await fetch("/api/savealarms", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                hours: hours,
                minutes: minutes,
            }),
        })
        setEditModal(false);
        receive();
    };

    const day = async (id: number, dayid: number) => {

        const alarm = alarmsaved.find(a => a.id === id);

        const currentDays = alarm?.days ?? [];

        const newDays =
            currentDays.includes(dayid)
                ? currentDays.filter(d => d !== dayid)
                : [...currentDays, dayid];

        await fetch("/api/savealarms", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                days: newDays,
            }),
        });
        receive();
    };



    const toggle = async (id: number) => {
        const alarm = alarmsaved.find(item => item.id === id);

        if (!alarm) {
            return;
        }

        const newSelected = !alarm.selected;
        // setAlarmsaved(prev =>
        //     prev.map(item => item.id === id ? { ...item, selected: newSelected } : item)
        // );

        await fetch("/api/savealarms", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                selected: newSelected,
            }),
        });


        receive();

        if (newSelected) {
            const currentTime = new Date();
            let diff = (alarm.hours * 60 + alarm.minutes) - (currentTime.getHours() * 60 + currentTime.getMinutes());
            if (diff < 0) {
                diff += 24 * 60;
            }
            const m = diff % 60;
            const h = Math.floor(diff / 60);
            alert(`Your alarm is scheduled in ${h} hours and ${m} minutes`);
        }
    };

    // setSelectedAlarms(prev => {
    //     const isSelected = prev.includes(id);
    //     if (!isSelected) {
    //         const alarm = alarmsaved.find(item => item.id === id);

    //         if (alarm) {
    //             const now = new Date();

    //             let difference = (alarm.hours * 60 + alarm.minutes)
    //                 -
    //                 (now.getHours() * 60 + now.getMinutes());

    //             if (difference < 0) {
    //                 difference += 24 * 60;
    //             }

    //             const h = Math.floor(difference / 60);
    //             const m = difference % 60;

    //             alert(`Alarm scheduled in ${h} hours and ${m} minutes`);
    //         }
    //         return [...prev, id];
    //     }
    //     return prev.filter(alarmID => alarmID !== id);
    // }



    // );


    type item = {
        id: number;
        hours: number;
        minutes: number;
        selected: boolean;
        days: number[];
        meridian: string;
    }
    const receive = async () => {
        const response = await fetch("/api/savealarms");
        const data = await response.json();
        setAlarmsaved(data);
    };

    const Delete = async (id: number) => {
        await fetch("/api/savealarms", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        setDeleteModal(false);
        setEditModal(false);
        receive();
    };

    useEffect(() => {
        receive();
    }, []);

    // const dayprint = new Date();
    // console.log(dayprint.toLocaleDateString("en-US", { weekday: "short" }));

    const addalarm = async () => {
        const response = await fetch("/api/savealarms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hours,
                minutes,
                selected: true,
                days: [1, 2, 3, 4, 5, 6],
                meridian,
            }),
        });

        const newAlarm = await response.json();
        setSelectedAlarms(prev => [...prev, newAlarm.id]);
        setAlarmsaved(prev => [...prev, newAlarm]);
        setAdd(false);
    };
    useEffect(() => {
        alarmRef.current = new Audio("/timer.mp3");
    }, []);

    // useEffect(() => {
    //     if (selected === true) {
    //         const a = new Date();
    //         alert(`Alarm Scheduled for ${hours - a.getHours()} hours and ${minutes - a.getMinutes()} minutes`);
    //     }
    // }, [selected,selectedAlarms]);

    const hours = Math.floor((totalseconds / 3600) % 24);
    const minutes = Math.floor((totalseconds % 3600) / 60);

    useEffect(() => {
        const interval = setInterval(() => {
            const a = new Date();

            alarmsaved.forEach((item) => {
                if (
                    item.selected &&
                    (a.getHours() === item.hours &&
                        a.getMinutes() === item.minutes)

                ) {

                    alarmRef.current?.play();
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [alarmsaved, selectedAlarms]);




    return (

        <div className="bg-gradient-to-bl from-lime-500 via-emerald-400 via-amber-400 via-teal-400 via-cyan-400 via-neutral-400 via-indigo-400 via-zinc-400 via-slate-400 to-fuchsia-400 text-white h-screen">
            <h1 className="text-7xl font-bold flex justify-center mb-4">Alarm</h1>

            <div className={` border-white ${selected ? "text-white bg-black" : "text-gray-400 bg-white"} border mx-2 rounded-lg `}>
                <p className="text-2xl flex justify-center">7:00 AM</p>

                <div className="flex justify-end gap-2 mr-2">

                    <div >
                        <button className="border border-white w-12 h-7 flex 
                        justify-center rounded-lg px-1"
                            onClick={() => { setEditModal(true) }}
                        >

                            <SquarePen></SquarePen>
                        </button>
                    </div>

                    <div>
                        <button className={`border ${selected ? "border-white" : "border-gray-400"} w-12 h-7 rounded-full px-1`}
                            onClick={() => {
                                setSelected(prev => !prev)
                                setTotalSeconds(25200);
                            }}>
                            <div className={`h-5 w-5  rounded-full transition-all ${selected ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-400"}`}>

                            </div>

                        </button>
                    </div>
                </div>

                <p className="flex justify-center">S M T W T F S </p>

            </div>



            {alarmsaved.map((item) => {
                // const selected = item.days.includes(item.id);

                return (
                    <>


                        {/* Database alarms */}

                        <div key={item.id} className={` mt-2 border-white ${item.selected ? "text-white bg-black" : "text-gray-400 bg-white"} border mx-2 rounded-lg `}>

                            <p className="text-2xl flex justify-center">
                                {String(item.hours).padStart(2, "0")}:{String(item.minutes).padStart(2, "0")} {item.meridian}
                            </p>


                            <div className="flex justify-end gap-2 mr-2">

                                <div >
                                    <button className="border border-white w-12 h-7 flex 
                                justify-center rounded-lg px-1"
                                        onClick={() => {
                                            setEditId(item.id);
                                            setEditModal(true);
                                            setTotalSeconds((item.hours * 60 + item.minutes) * 60);
                                        }}
                                    >

                                        <SquarePen />
                                    </button>
                                </div>

                                <div>
                                    <button className={`border ${item.selected ? "border-white" : "border-gray-400"} w-12 h-7 rounded-full px-1`}
                                        onClick={() => {
                                            toggle(item.id)
                                            setTotalSeconds((item.hours * 60 + item.minutes) * 60)


                                        }}>
                                        <div className={`h-5 w-5  rounded-full transition-all ${item.selected ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-400"}`}>

                                        </div>

                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center mb-1">
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(0) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 0);
                                    }}
                                >S</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(1) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 1);
                                    }}
                                >M</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(2) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 2);
                                    }}
                                >T</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(3) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 3);
                                    }}
                                >W</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(4) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 4);
                                    }}
                                >T</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(5) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 5);
                                    }}
                                >F</button>
                                <button className={` m-1 p-1 rounded-full w-8 h-8 ${(item.days ?? []).includes(6) ? "bg-red-700" : ""} hover:cursor-pointer  `}
                                    onClick={() => {
                                        day(item.id, 6);
                                    }}
                                >S</button>
                            </div>
                        </div>
                    </>
                )

            })}





            <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
                <button className=" w-15  m-2 py-3  bg-red-700 rounded-lg text-xl 
                                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                    onClick={() => { setAdd(prev => !prev); }}
                >
                    +
                </button>
            </div>

            {
                add && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center ">

                        <div className="mt-4 bg-gray-900 rounded-lg p-4">
                            <div className="flex gap-5">
                                <div>
                                    <h1 className="text-6xl font-bold  justify-center flex">Hours:</h1>
                                    <p className=" w-full border-2 rounded-lg  border-white font-bold text-7xl 
                                                    flex justify-center p-15"
                                    >
                                        {String(hours).padStart(2, "0")}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 3600))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            -
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 36000))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            - 10
                                        </button>

                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 3600))}
                                            className="w-15  py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            +
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 36000))}
                                            className="w-15 py-3 bg-red-700 
                                            rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            + 10
                                        </button>
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="text-6xl font-bold ">Minutes:</h1>
                                    <p className="border-2 rounded-lg  border-white font-bold text-7xl flex justify-center p-15">
                                        {String(minutes).padStart(2, "0")}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">

                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 60))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            -
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 600))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            - 10
                                        </button>



                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 60))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            +
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 600))}
                                            className="w-15 py-3 bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            + 10
                                        </button>

                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center mt-2">
                                <button onClick={addalarm}
                                    className="w-50 py-3 rounded-lg text-xl 
                                                bg-gradient-to-r from-blue-500 via-pink-600 to-purple-600
                hover:bg-red-800 hover:shadow-xl shadow-pink-700 hover:border hover:border-white">
                                    Add Alarm
                                </button>
                            </div>
                        </div>
                    </div>

                )
            };

            {
                editModal && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center ">

                        <div className="mt-4 bg-gray-900 rounded-lg p-4">
                            <p className="text-4xl font-bold flex justify-center 
                            bg-gradient-to-r from-blue-400 via-purple-600 to-violet-800 rounded mb-4"
                            >Edit Alarm</p>
                            <div className="flex gap-5">
                                <div>
                                    <h1 className="text-6xl font-bold  justify-center flex">Hours:</h1>
                                    <p className=" w-full border-2 rounded-lg  border-white font-bold text-7xl 
                                                    flex justify-center p-15"
                                    >
                                        {String(hours).padStart(2, "0")}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 3600))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            -
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 36000))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            - 10
                                        </button>

                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 3600))}
                                            className="w-15  py-3  bg-red-700 rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            +
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 36000))}
                                            className="w-15 py-3 bg-red-700 
                                            rounded-lg text-xl 
                                            hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            + 10
                                        </button>
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="text-6xl font-bold ">Minutes:</h1>
                                    <p className="border-2 rounded-lg  border-white font-bold text-7xl flex justify-center p-15">
                                        {String(minutes).padStart(2, "0")}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">

                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 60))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            -
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev - 600))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            - 10
                                        </button>



                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 60))}
                                            className="w-15 py-3  bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            +
                                        </button>
                                        <button onClick={() => setTotalSeconds(prev => Math.max(0, prev + 600))}
                                            className="w-15 py-3 bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white">
                                            + 10
                                        </button>

                                    </div>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <button onClick={() => { meridian(editId!, "AM"); setMeridianState(true); }}
                                        className={`p-2 w-25 
                                            ${meridianState ? "bg-black border-2 border-white" 
                                                : "bg-white text-black border-2 border-black"} rounded text-xl `}
                                    >AM</button>
                                    <button onClick={() => { meridian(editId!, "PM"); setMeridianState(false); }}
                                        className={`p-2 w-25 
                                            ${meridianState ? "bg-white text-black  border-2 border-black" 
                                                : "bg-black border-2 shadow-xl shadow-black border-white"} rounded text-xl `}
                                    >PM</button>
                                </div>

                            </div>



                            <div className="flex justify-center">
                                <button onClick={() => { update(editId!) }}
                                    className="p-3 my-2 bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                                >Update</button>
                            </div>

                            <div className="flex justify-end">
                                <button onClick={() => {
                                    setDeleteId(editId);
                                    setDeleteModal(true);
                                }}
                                    className="p-3 mr-2 bg-gradient-to-b  from-black to-red-700  rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                                >Delete Alarm</button>

                                <button onClick={() => { setEditModal(false) }}
                                    className="w-15 py-3 bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                                >OK</button>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                deleteModal && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-1">

                        <div className="mt-4 bg-gray-900 rounded-lg p-4">
                            <p className="text-4xl font-bold flex justify-center 
                            bg-gradient-to-r from-blue-400 via-purple-600 to-violet-800 rounded mb-4"
                            >Delete Alarm?</p>
                            <p className="mb-2">Are you sure you want to delete this alarm?</p>

                            <div className="flex justify-end">
                                <button onClick={() => {
                                    Delete(deleteId!);
                                }}
                                    className="p-3 mr-2 bg-gradient-to-b  from-black to-red-700  rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                                >Delete Alarm</button>

                                <button onClick={() => { setDeleteModal(false) }}
                                    className=" py-3 bg-red-700 rounded-lg text-xl 
                hover:bg-red-800 hover:shadow-xl shadow-red-700 hover:border hover:border-white"
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }


        </div>

    );
}
