import Cookies from "js-cookie";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./helpers/ScrollToTop";
import LoginPages from "./pages/login";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { requestGetUserFromToken } from "./redux/slices/authSlice";
import { RootState } from "./redux/store";
import { privateRoutes, publicRoutes } from "./routes/routes";

function App() {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state: RootState) => state.authState.userInfo)
  const isLoading = useAppSelector((state: RootState) => state.authState.loadingCheckLogin)

  useLayoutEffect(() => {
    const cookie = Cookies.get('token')
    if (cookie) {
      dispatch(requestGetUserFromToken({ token: cookie }))
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App" style={{ overflow: "hidden" }}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
            // return isLoading ? <Route key={index} path={route.path} element={<>loading</>} /> : <Route key={index} path={route.path} element={<Page />} />;
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading ? <Route key={index} path={route.path} element={<>loading</>} /> : <Route key={index} path={route.path} element={(userInfo?._id ? <Page /> : <Navigate to={'/login'} />)} />
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
