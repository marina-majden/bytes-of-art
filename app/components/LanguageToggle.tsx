import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "en" ? "hr" : "en");
    };

    return (
        <button
            onClick={toggle}
            className='px-3 py-1 mx-2 text-sm font-bold text-secondary border border-secondary/20 rounded hover:bg-white/10 transition-colors uppercase z-50 cursor-pointer'>
            {i18n.language === "en" ? "HR" : "EN"}
        </button>
    );
}
