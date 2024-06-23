  import React from "react";
  import Home from "./components/home";
  import ErrorPage from "./components/error";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import "./App.css";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<ErrorPage />}/>
          {/* /404.html */}
          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
