import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="340504559300-3dah71nq1r5i1khgs4e09md2p0itaaat.apps.googleusercontent.com">
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
