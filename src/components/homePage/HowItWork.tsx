import { MdAccountBox, MdMergeType } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { TitleSec } from "../ui/WhyUsComponent";
import { SiTaketwointeractivesoftware } from "react-icons/si";

const HowItWork = () => {
    return (
        <div className="container p-2">
            <TitleSec title="Details" subTitle="how it work" />

            <div className="flex items-start flex-wrap gap-10 mt-3 sm:mt-10">
                <div>
                    <h2 className="font-bold text-3xl mb-4">how it work</h2>
                    <div className="flex gap-10 items-center relative">
                        <div className="absolute top-0 left-0 min-h-full w-1 bg-blue-600"></div>

                        <div className="ms-2 font-semibold text-xl flex flex-col gap-y-2">
                            <div className="relative flex gap-1 items-center">
                                <span className="absolute top-1/2 -translate-y-1/2 -left-[14px] h-4 w-4 rounded-full bg-blue-600/80"></span>
                                <MdAccountBox className="text-2xl text-blue-600 ms-2" /> Create Account
                            </div>
                            <div className="relative flex gap-1 items-center">
                                <span className="absolute top-1/2 -translate-y-1/2 -left-[14px] h-4 w-4 rounded-full bg-blue-600/80"></span>
                                <MdMergeType className="text-2xl text-blue-600 ms-2" /> Choose Your Type Of License
                            </div>
                            <div className="relative flex gap-1 items-center">
                                <span className="absolute top-1/2 -translate-y-1/2 -left-[14px] h-4 w-4 rounded-full bg-blue-600/80"></span>
                                <IoSend className="text-2xl text-blue-600 ms-2" /> Send Your Request
                            </div>
                            <div className="relative flex gap-1 items-center">
                                <span className="absolute top-1/2 -translate-y-1/2 -left-[14px] h-4 w-4 rounded-full bg-blue-600/80"></span>
                                <SiTaketwointeractivesoftware className="text-2xl text-blue-600 ms-2" /> Receive The License On Time
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HowItWork;