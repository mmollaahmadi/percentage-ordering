import React from 'react';
import Header from "../../composite/header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={'min-w-[100vw] text-white bg-black font-Yekan'} style={{direction: 'rtl'}}>
            <Header/>
            <div className={'min-h-[90vh] w-full px-10 py-10'} >
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;
