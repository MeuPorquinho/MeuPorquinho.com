import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./views/Home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/management" element={<Management />} /> */}
                {/* <Route path="/user" element={<User />} /> */}
                {/* put new routes here... */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;