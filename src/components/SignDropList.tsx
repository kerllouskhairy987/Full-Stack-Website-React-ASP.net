import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { FaSignInAlt } from 'react-icons/fa'
import { NavLink } from 'react-router';

const SignDropList = () => {
    return (
        <div>
            <Menu __demoMode>
                <MenuButton className="cursor-pointer inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Sign
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="z-[100] w-52 origin-top-right rounded-xl border border-white/5 bg-[#031F47] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <NavLink to={"/login"}>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
                                <FaSignInAlt className="size-4 fill-white/30" />
                                Login
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘L</kbd>
                            </button>
                        </MenuItem>
                    </NavLink>

                    <NavLink to={"/register"}>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
                                <FaSignInAlt className="size-4 fill-white/30" />
                                Register
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘R</kbd>
                            </button>
                        </MenuItem>
                    </NavLink>

                </MenuItems>
            </Menu>
        </div>
    )
}
export default SignDropList;