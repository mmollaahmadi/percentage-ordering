import React from 'react';

const Header = () => {
    return (
        <div className={'flex justify-between bg-black py-4 px-6 border-b border-b-gray-700'}>
            <p className={'text-2xl leading-none'}>
                بیت‌پین
            </p>
            <p className={'text'}>
                سفارش‌گذاری درصدی
            </p>
        </div>
    )
}

export default Header;
