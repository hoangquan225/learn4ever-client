import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./helpers/ScrollToTop";
import { publicRoutes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App" style={{ overflow: "hidden" }}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
