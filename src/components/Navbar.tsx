import { NavLink } from "react-router";
import SignDropList from "./SignDropList";
import { CiBoxList } from "react-icons/ci";
import { useState } from "react";

const Navbar = () => {
  const [openList, setOpenList] = useState(false);
  return (
    <ul className="bg-[#171918] shadow-2xl" >
      <div className="container mx-auto flex items-center justify-between">
        <li className="p-2">
          <NavLink to={"/"}>
            {" "}
            <h1 className="font-bold text-3xl text-white">DVLD</h1>{" "}
          </NavLink>
        </li>

        <div className="p-2">
          <li
            onClick={() => setOpenList(!openList)}
            className="sm:hidden rounded-full w-10 h-10 bg-[#031F47] text-2xl flex items-center justify-center cursor-pointer text-white"
          >
            <CiBoxList />
          </li>
          <div className="hidden sm:flex items-center gap-1 sm:gap-5 text-white">
            <li className="">
              <NavLink className={"px-2 py-1"} to={"services"}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink className={"px-2 py-1"} to={"contact"}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className={"px-2 py-1"} to={"why-us"}>
                Why Us
              </NavLink>
            </li>

            <li>
              <SignDropList />
            </li>
          </div>
        </div>

        {openList && (
          <div className="sm:hidden absolute top-[56px] bg-[#031F47] shadow-2xl w-full flex flex-col items-center justify-center gap-y-3 p-5 z-1 text-white">
            <li onClick={() => setOpenList(!openList)}>
              <NavLink className={"px-2 py-1"} to={"services"}>
                Services
              </NavLink>
            </li>
            <li onClick={() => setOpenList(!openList)}>
              <NavLink className={"px-2 py-1"} to={"contact"}>
                Contact
              </NavLink>
            </li>
            <li onClick={() => setOpenList(!openList)}>
              <NavLink className={"px-2 py-1"} to={"why-us"}>
                Why Us
              </NavLink>
            </li>

            <li>
              <SignDropList />
            </li>
          </div>
        )}
      </div>
    </ul>
  );
};

export default Navbar;
