// This is the layout route for the application which contains header with logo and navigation list of four links, and footer with copyright information.
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa";
import MobileNavigation from "../components/MobileNavigation";

export default function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpen((v) => !v);
    };

    const handleCloseMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // optional: lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <div className='w-screen min-h-screen h-full flex flex-col space-between'>
            <header className='flex items-center justify-between p-4 bg-transparent'>
                <div className='logo header-logo text-lg font-semibold flex flex-row items-baseline-last gap-0'>
                    <span>Lit Art 🔥</span>
                </div>

                {/* Mobile menu button */}
                <button
                    type='button'
                    className=' p-2 text-2xl text-teal-400 hover:text-teal-300 z-50'
                    aria-label='Open menu'
                    aria-expanded='true'
                    onClick={handleToggleMobileMenu}>
                    {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
                </button>
            </header>

            {/* Mobile navigation (component handles its own animation; onClose closes it) */}
            <MobileNavigation
                isOpen={isMobileMenuOpen}
                onClose={handleCloseMobileMenu}
            />

            <main className='w-full min-h-screen h-full flex flex-col items-center justify-center gap-2 py-2 mx-auto scroll-smooth snap-proximity'>
                <Outlet />
            </main>

            <footer className='w-full'>
                <p className='text-center text-sm p-6 mx-auto'>
                    <span className='text-teal-500 font-bold'>
                        Bytes of Art
                    </span>{" "}
                    <FaCopyright className='inline' /> Marina Majdenić{" "}
                    <span className='text-xs text-blue-500 font-bold'>
                        2025
                    </span>{" "}
                    All rights reserved.
                </p>
            </footer>
        </div>
    );
}
