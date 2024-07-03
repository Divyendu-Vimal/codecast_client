import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import EditorPage from "./components/EditorPage";
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster position="top-center"></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
};

export default App;
