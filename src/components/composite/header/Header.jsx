import React, {useLayoutEffect} from 'react';
import BitPinLogo from "../../../assets/images/logo.png";
import {MoonIcon, SunIcon} from "../../../assets/icons/index.jsx";

const Header = () => {
    const [colorMode, setColorMode] = React.useState("light");

    useLayoutEffect(() => {
        const _colorMode = localStorage.getItem("colorMode");
        if(_colorMode) {
            setColorMode(_colorMode);
            document.documentElement.classList.add(_colorMode);
        } else {
            setColorMode("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const changeColorMode = () => {
        const newColorMode = colorMode === "dark" ? "light" : "dark";
        setColorMode(newColorMode);

        document.documentElement.classList.remove(colorMode);
        document.documentElement.classList.add(newColorMode);

        localStorage.setItem("colorMode", newColorMode);
    }

    return (
        <div className={'flex justify-between bg-white dark:bg-black py-4 px-6 border-b border-b-gray-700 items-center'}>
            <div className={'flex justify-between gap-3 items-center'}>
                <img src={BitPinLogo} alt="BitPin Logo" className="mr-4 w-12 object-contain" />
                <p className={'text-2xl leading-none'}>
                    بیت‌پین
                </p>
            </div>

            <p className={'text-lg leading-none'}>
                سفارش‌گذاری درصدی
            </p>
            <button
                onClick={() => changeColorMode()}
                className={'bg-transparent p-1 border-none dark:hover:bg-gray-900 focus:outline-none'}>
                {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
            </button>
        </div>
    )
}

export default Header;
