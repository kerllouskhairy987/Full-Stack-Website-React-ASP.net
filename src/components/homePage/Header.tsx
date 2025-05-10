import { Link } from "react-router";
import bg_home from "../../assets/bg_home.jpg";
const HeaderSec = () => {
    return (
        <div className={`max-h-screen h-screen w-full relative`}>
            <img className="max-h-screen h-screen w-full object-cover object-top" src={bg_home} alt="home page image" />
            <div className="absolute inset-0 z-[5] bg-gray-500 opacity-50"></div>
            <div className="container w-[calc(100%-8px)] lg:w-fit absolute top-1/2 left-1/2 -translate-1/2 z-10 bg-gray-100/70 p-4 text-center rounded shadow-2xl dark:bg-black/70">
                <h2 className="text-xl font-semibold capitalize">The first electronic platform for booking driving license appointments in Egypt.</h2>
                <Link to="services">
                    <button className="mt-10 bg-[#031F47!important] py-3 px-5 font-semibold active:scale-95 block mx-auto rounded cursor-pointer text-white"
                    type="button"
                    >Try now</button>
                </Link>
            </div>
        </div>
    )
}

export default HeaderSec