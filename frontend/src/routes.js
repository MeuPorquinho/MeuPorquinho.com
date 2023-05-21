import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./views/home/Home";
import SignIn from "./views/signIn";
import LogIn from "./views/logIn";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/login" element={<LogIn />} />
                {/* <Route path="/management" element={<Management />} /> */}
                {/* <Route path="/user" element={<User />} /> */}
                {/* put new routes here... */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;