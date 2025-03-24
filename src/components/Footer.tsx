import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa"
import Button from "./Button"
import img from "../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";

const Footer = () => {
    return (
        <div className="bg-[#031F47] py-10 mt-14">
            <div className="container px-3 flex justify-between items-start gap-8 flex-wrap text-white">

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 cursor-pointer mb-3">
                        <img className="w-10 h-10 rounded-full" src={`${img}`} alt="DVLD" />
                        <h1>DVLD</h1>
                    </div>
                    <a href="#">To subscribe new letter click to subscribe</a>
                    <Button className="bg-[#066DA4] w-fit" type="button">subscribe</Button>
                    <div className="mt-5 order-1 w-full kero">
                        <h4 className="mb-3">Contact Us</h4>
                        <div className="flex items-center gap-4">
                            <a className="w-10 h-10 rounded-full border-2 border-[#066DA4] flex items-center justify-center text-xl hover:text-sm duration-100" href="#"><FaFacebookF /></a>
                            <a className="w-10 h-10 rounded-full border-2 border-[#066DA4] flex items-center justify-center text-xl hover:text-sm duration-100" href="#"><FaTwitter /></a>
                            <a className="w-10 h-10 rounded-full border-2 border-[#066DA4] flex items-center justify-center text-xl hover:text-sm duration-100" href="#"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <a className="mb-3" href="#">Our Vision</a>
                    <a href="#">Press Releases</a>
                </div>

                <div className="flex flex-col gap-1">
                    <a className="mb-3" href="#">Our Goals</a>
                    <a href="#">Audio Traffic Report</a>
                </div>

                <div className="flex flex-col gap-1">
                    <a className="mb-3" href="#">Articles</a>
                    <a href="#">Guidance and information services</a>
                </div>

                <div className="flex flex-col gap-1">
                    <a className="mb-3" href="#">News</a>
                    <a href="#">E-Services</a>
                    <a href="#">Geographic Services</a>
                </div>


            </div>
        </div>
    )
}

export default Footer