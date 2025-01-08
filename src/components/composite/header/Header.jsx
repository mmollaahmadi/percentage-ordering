import React from 'react';
import BitPinLogo from "../../../assets/images/logo.png";

const Header = () => {
    return (
        <div className={'flex justify-between bg-black py-4 px-6 border-b border-b-gray-700'}>
            <div className={'flex justify-between gap-3 items-center'}>
                <img src={BitPinLogo} alt="BitPin Logo" className="mr-4 w-12 object-contain" />
                <p className={'text-2xl leading-none'}>
                    بیت‌پین
                </p>
            </div>

            <p className={'text'}>
                سفارش‌گذاری درصدی
            </p>
        </div>
    )
}

export default Header;
