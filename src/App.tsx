import React from "react";
import Banner1 from "./components/banner1";
import Banner2 from "./components/banner2";
import Describe from "./components/describe";
import Feedback from "./components/feedback";
import Footer from "./components/footer";
import Header from "./components/header";
import Panel from "./components/panel";
import { LoginPages } from "./pages/login";
import Policy from "./pages/policy";
import Privacy from "./pages/privacy";
import { RegisterPages } from "./pages/register";

function App() {
  return (
    <div className="App">
      {/* <LoginPages /> */}
      {/* <RegisterPages /> */}
      <Header />
      {/* <Describe /> */}
      <Banner1 />
      <Banner2 />
      <Panel />
      <Feedback />
      <Footer />
      {/* <Policy /> */}
      {/* <Privacy /> */}
    </div>
  );
}

export default App;
