
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
