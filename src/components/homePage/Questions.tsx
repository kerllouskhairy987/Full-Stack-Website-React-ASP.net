import { FaStar } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io";
import { TitleSec } from "../ui/WhyUsComponent"
import { Link } from "react-router"
import Button from "../Button"
import { useState } from "react";

const Questions = () => {
    const [Requirements, setRequirements] = useState(false);
    const [appointment, setAppointment] = useState(false);
    const [status, setStatus] = useState(false);


    return (
        <div className="container p-2">
            <TitleSec title="Questions" subTitle="frequently asked questions" />

            <div className="flex items-start justify-between gap-10 md:flex-nowrap flex-wrap mt-3 sm:mt-10">

                <div className="flex flex-col gap-5 grow">
                    <div className={`bg-[#F5F7F8] dark:bg-black/50 p-2 md:p-4 rounded border ${Requirements ? "border-blue-600" : ""}`}>
                        <button onClick={() => setRequirements(prev => !prev)} type="button" className="flex items-center justify-between cursor-pointer w-full">
                            <h2 className="font-bold text-lg line-clamp-1" title="Requirements ?">Requirements ?</h2>
                            <span><IoIosArrowDown className={`${Requirements ? "rotate-180" : ""}`} /></span>
                        </button>
                        <p className={`mx-3 my-2 ${Requirements ? "block" : "hidden"} `}>Lore animi itaque excepturi.</p>
                    </div>

                    <div className={`bg-[#F5F7F8] dark:bg-black/50 p-2 md:p-4 rounded border ${appointment ? "border-blue-600" : ""}`}>
                        <button onClick={() => setAppointment(prev => !prev)} type="button" className="flex items-center justify-between cursor-pointer w-full">
                            <h2 className="font-bold text-lg line-clamp-1" title="Can I change the appointment ?">Can I change the appointment ?</h2>
                            <span><IoIosArrowDown className={`${appointment ? "rotate-180" : ""}`} /></span>
                        </button>
                        <p className={`mx-3 my-2 ${appointment ? "block" : "hidden"} `}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente possimus facere voluptatum ad saepe sequi dolorum voluptate dignissimos accusantium numquam veniam, quas, ipsum vero provident culpa commodi animi itaque excepturi.</p>
                    </div>

                    <div className={`bg-[#F5F7F8] dark:bg-black/50 p-2 md:p-4 rounded border ${status ? "border-blue-600" : ""}`}>
                        <button onClick={() => setStatus(prev => !prev)} type="button" className="flex items-center justify-between cursor-pointer w-full">
                            <h2 className="font-bold text-lg line-clamp-1" title="How do I track the reservation status ?">How do I track the reservation status ?</h2>
                            <span><IoIosArrowDown className={`${status ? "rotate-180" : ""}`} /></span>
                        </button>
                        <p className={`mx-3 my-2 ${status ? "block" : "hidden"} `}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente possimus facere voluptatum ad saepe sequi dolorum voluptate dignissimos accusantium numquam veniam, quas, ipsum vero provident culpa commodi animi itaque excepturi.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border border-blue-600 rounded shadow-blue-600 bg-[#F5F7F8] dark:bg-black/50 p-5 w-[320px] md:min-w-[320px]">
                    <FaStar className="text-5xl" />
                    <h2 className="font-bold text-3xl">Ask your <span className="text-blue-600">Question</span></h2>
                    <p>If the question is not available on our FAQ section, Feel free to contact me or Drop it directly here and I will ASAP..</p>
                    <Link to="/contact" className="block mx-auto w-fit">
                        <Button type="button">Contact US</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Questions