import React from "react";
import Banner from "./components/banner";
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
      <Banner />
      <Panel />
      <Feedback />
      <Footer />
      {/* <Policy /> */}
      {/* <Privacy /> */}
    </div>
  );
}

export default App;
