import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/screen/layout";
import MarketsPage from "./pages/markets";
import MarketDetailsPage from "./pages/market-details";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<MarketsPage/>}/>
                    <Route path="/market/:marketId" element={<MarketDetailsPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
