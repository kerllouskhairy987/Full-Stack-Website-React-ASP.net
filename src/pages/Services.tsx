import local_img from "../assets/local-.jpeg"
import international_img from "../assets/international-.jpeg"
import Button from "../components/Button"
import { Link } from "react-router"
import RenewLicense from "@/components/RenewLicense"
import LostLicense from "@/components/LostLicense"
// import ReleaseLicense from "@/components/ReleaseLicense"
import DamagedLicense from "@/components/DamagedLicense"

const Services = () => {
    return (
        <div>
            <img loading="eager" src="https://moi.gov.eg/img/main-header-bg.jpg" className="animate-pulse min-h-[200px]" alt="image" />
            <div className="container mt-[-100px] px-2">

                <div className="flex items-center justify-center my-10">
                    <span className="animate-bounce relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#031F47]">
                        <h2 className="relative text-white font-semibold text-3xl p-2 mx-auto">Applications</h2>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-10 flex-wrap">
                    <div className="border overflow-hidden w-[400px] rounded-t-[200px] hover:shadow-2xl dark:shadow-blue-400/40">
                        <a href={local_img}>
                            <img src={local_img} alt="international license" className="rounded-full w-[250px] h-[250px] mx-auto p-3 animate-none hover:animate-spin" />
                        </a>
                        <h2 className="py-3 text-center font-semibold">Local License</h2>
                        <Link to="local">
                            <Button type="button" className="cursor-pointer block w-full rounded-none">View Details</Button>
                        </Link>
                    </div>

                    <div className="border overflow-hidden w-[400px] rounded-t-[200px] hover:shadow-2xl dark:shadow-blue-400/40">
                        <a href={international_img}>
                            <img src={international_img} alt="international license" className="rounded-full w-[250px] h-[250px] mx-auto p-3 animate-none hover:animate-spin" />
                        </a>
                        <h2 className="py-3 text-center font-semibold">International License</h2>
                        <Link to="global">
                            <Button type="button" className="cursor-pointer block w-full rounded-none">View Details</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <hr className="mt-5 " />
            {/* Apply For New License */}
            <RenewLicense />
            <hr className="mt-5 " />
            {/* Apply For Lost License */}
            <LostLicense />
            <hr className="mt-5 " />
            {/* Apply For release License */}
            {/* <ReleaseLicense /> */}
            {/* <hr className="mt-5 " /> */}
            {/* Apply For Damaged License */}
            <DamagedLicense />
        </div>
    )
}

export default Services