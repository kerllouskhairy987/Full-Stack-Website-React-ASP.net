import { NavLink } from "react-router-dom";
import SignDropList from "./SignDropList";
import { CiBoxList } from "react-icons/ci";
import { useState } from "react";

const Navbar = () => {
  const [openList, setOpenList] = useState(false);

  const navItems = [
    { to: "/services", text: "Services" },
    { to: "/contact", text: "Contact" },
    { to: "/why-us", text: "Why Us" },
    { to: "/admin", text: "Admin" }
  ];

  const renderNavItems = (mobile = false) => (
    <>
      {navItems.map((item) => (
        <li key={item.to} onClick={() => mobile && setOpenList(false)}>
          <NavLink 
            className="px-2 py-1 hover:text-blue-300 transition-colors"
            to={item.to}
          >
            {item.text}
          </NavLink>
        </li>
      ))}
      <li>
        <SignDropList />
      </li>
    </>
  );

  return (
    <nav className="bg-[#171918] shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-2">
        <NavLink to="/">
          <h1 className="font-bold text-3xl text-white hover:text-blue-300 transition-colors">DVLD</h1>
        </NavLink>
        <div className="flex items-center">
          <ul className="hidden sm:flex items-center gap-5 text-white">
            {renderNavItems()}
          </ul>
          <button
            onClick={() => setOpenList(!openList)}
            className="sm:hidden ml-4 rounded-full w-10 h-10 bg-[#031F47] flex items-center justify-center text-white hover:bg-[#052a5f] transition-colors"
            aria-expanded={openList}
            aria-label="Toggle navigation"
          >
            <CiBoxList className="text-2xl" />
          </button>
        </div>

        {openList && (
          <ul className="sm:hidden absolute top-16 left-0 right-0 bg-[#031F47] shadow-lg py-3 px-4 flex flex-col items-center gap-3 text-white animate-fadeIn">
            {renderNavItems(true)}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;