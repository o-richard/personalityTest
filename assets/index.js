import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage.js';
import AllPage from './components/AllPage.js';

const AllRoutes = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllPage />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AllRoutes />);