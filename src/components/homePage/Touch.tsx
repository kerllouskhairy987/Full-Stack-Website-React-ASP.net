import { Link } from "react-router"
import vectorImg from "../../assets/vectorImg.png"
import Button from "../Button"

const Touch = () => {
    return (
        <div className="py-3 sm:py-10 bg-[#F5F7F8] dark:bg-black/50">
            <div className="container p-2 mx-auto text-center">
                <img className="block mx-auto" src={vectorImg} alt="Vector Image" />

                <h2 className="font-bold text-3xl mt-2">Ready to Elevate Your License?</h2>
                <p className="my-4 sm:my-10">Take your career to the next level by upgrading your license and unlocking new opportunities. Whether you're seeking higher-level certifications, expanding your skillset, or stepping into new industries, now is the perfect time to invest in your future. Let’s make that next big move together—your upgraded license is just a few steps away! 🚀</p>
                <Link to="/contact" className="block mx-auto w-fit">
                    <Button type="button">Get In Touch</Button>
                </Link>
            </div>
        </div>
    )
}

export default Touch