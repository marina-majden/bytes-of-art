import "./patterns.css";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa";
import MobileNavigation from "../components/MobileNavigation";
import LanguageToggle from "../components/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

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
        <div className='hex-container max-w-screen p-0 m-0 '>
            <header className='flex items-center justify-between p-4 bg-transparent'>
                <div className='logo header-logo text-5xl text-secondary text-shadow-black text-shadow-lg font-semibold flex flex-row items-baseline-last gap-0 z-50'>
                    <span className='font-anton'>LitArt</span>
                    {/**/}
                </div>

                <LanguageToggle />

                {/* Mobile menu button */}
                <button
                    type='button'
                    className=' p-2 text-2xl text-primary hover:text- z-50'
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

            <main className='w-full h-full mx-auto'>
                <Outlet />
            </main>

            <footer className='w-full text-gray-500'>
                <p className='text-center text-sm p-6 mx-auto'>
                    <span className='text-cyan-600 font-bold'>
                        Bytes of Art
                    </span>{" "}
                    <FaCopyright className='inline' /> Marina Majdenić{" "}
                    <span className='text-xs text-indigo-800 font-bold'>
                        2025
                    </span>{" "}
                    {t("allRightsReserved")}
                </p>
            </footer>
        </div>
    );
}
