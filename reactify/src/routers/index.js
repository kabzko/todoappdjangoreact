import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../views/home';
import Edit from '../views/edit';
import Delete from '../views/delete';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/edit/:id" element={<Edit />} />
                <Route exact path="/delete/:id" element={<Delete />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;