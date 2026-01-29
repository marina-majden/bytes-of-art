import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import LanguageToggle from "./LanguageToggle";

interface MobileNavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
    const { t } = useTranslation();

    const links = [
        { to: "/symbols", label: t("symbols") },
        { to: "/city", label: t("city") },
        { to: "/portraits", label: t("portraits") },
        { to: "/synesthesia", label: t("synesthesia") },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-40 flex flex-col bg-[#0d0d1a]/95 backdrop-blur-md pt-28 lg:hidden"
                >
                    <nav className="flex flex-col items-center gap-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `text-2xl font-bold uppercase tracking-widest transition-colors ${
                                        isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-12 flex justify-center">
                        <LanguageToggle />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}