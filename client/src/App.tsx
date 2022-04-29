import React from "react";
import logo from "./logo.svg";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  styled,
} from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import { Navbar } from "./navbar/Navbar";

import { Register } from "./register/Register";
import { Admin } from "./admin/Admin";
import { theme } from "./theme";

export const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar></Navbar>
              <Outlet></Outlet>
            </>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
