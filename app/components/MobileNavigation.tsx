import React from "react";
import { NavLink } from "react-router";

interface MobileNavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNavigation({
    isOpen,
    onClose,
}: MobileNavigationProps) {
    return (
        <nav
            className={`fixed inset-y-0 top-20 right-0 z-40 w-dvw h-dvh bg-transparent backdrop-blur-xl transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            aria-hidden
            aria-label='Navigation'>
            <ul className='w-dvw h-dvh flex flex-col justify-center align-middle items-end p-4 space-y-4 backdrop-blur-xl'>
                <li>
                    <NavLink
                        to='/'
                        end
                        onClick={onClose}
                        className={({ isActive, isPending }) =>
                            [
                                "navlink",
                                isPending ? "pending" : "",
                                isActive ? "text-blue-400" : "",
                            ].join(" ")
                        }>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/portraits'
                        onClick={onClose}
                        className={({ isActive, isPending }) =>
                            [
                                "navlink",
                                isPending ? "pending" : "",
                                isActive ? "text-blue-400" : "",
                            ].join(" ")
                        }>
                        Portraits, politics and propaganda
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/symbolism'
                        onClick={onClose}
                        className={({ isActive, isPending }) =>
                            [
                                "navlink",
                                isPending ? "pending" : "",
                                isActive ? "text-blue-400" : "",
                            ].join(" ")
                        }>
                        Symbols around us
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/city'
                        onClick={onClose}
                        className={({ isActive, isPending }) =>
                            [
                                "navlink",
                                isPending ? "pending" : "",
                                isActive ? "text-blue-400" : "",
                            ].join(" ")
                        }>
                        City Of L/Night
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
