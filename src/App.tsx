import { unwrapResult } from "@reduxjs/toolkit";
import { notification } from "antd";
import Cookies from "js-cookie";
import { createContext, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SocketService } from "./api/realtime";
import Loading from "./components/loading";
import ArrowToTop from "./helpers/ArrowToTop";
import ScrollToTop from "./helpers/ScrollToTop";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { requestGetUserFromToken, setLoadingCheckLogin } from "./redux/slices/userSlice";
import { RootState } from "./redux/store";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { useAxios } from "./api/config";
import { requestLoadCategorys } from "./redux/slices/categorySlice";

export const RealtimeContext: React.Context<SocketService> = createContext(
  new SocketService()
);

const realtime = new SocketService();

function App() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(
    (state: RootState) => state.authState.userInfo
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.authState.loadingCheckLogin
  );
  const isLoading1 = useAppSelector(
    (state: RootState) => state.category.loadingCheckLogin
  );
  

  useLayoutEffect(() => {
    checkLogin();
    loadCategorys();
  }, []);

  function L4EHooks() {
    useAxios()
    return null
  }

  useEffect(() => {
    if (userInfo) {
      realtime.joinSocket({ userInfo });
    }
  }, [userInfo]);
  
  const checkLogin = async () => {
    try {
      const result = await dispatch(
        requestGetUserFromToken()
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "Server đang bị lỗi",
      });
    }
  };

  const loadCategorys = async () => {
    try {
      const actionResult = await dispatch(
        requestLoadCategorys({
          status: 1,
        })
      );
      unwrapResult(actionResult);
    } catch (error) {
      notification.error({
        message: "không tải được danh sach danh mục",
      });
    }
  };

  return (
    <RealtimeContext.Provider value={realtime.init()}>
      <BrowserRouter>
        <L4EHooks />
        <ScrollToTop />
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return isLoading ? (
                <Route key={index} path={route.path} element={<Loading />} />
              ) : (
                <Route key={index} path={route.path} element={<Page />} />
              );
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return isLoading ? (
                <Route key={index} path={route.path} element={<Loading />} />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    userInfo?._id ? <Page /> : <Navigate to={"/dang-nhap"} />
                  }
                />
                // <Route key={index} path={route.path} element={<Page />} />
              );
            })}
          </Routes>
        </div>
        <ArrowToTop />
      </BrowserRouter>
    </RealtimeContext.Provider>
  );
}

export default App;
