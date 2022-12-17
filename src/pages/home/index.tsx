import classNames from "classnames/bind";

import styles from "./home.module.scss";
import Header from "../../components/header";
import Banner1 from "../../components/banner1";
import Banner2 from "../../components/banner2";
import Panel from "../../components/panel";
import Feedback from "../../components/feedback";
import Footer from "../../components/footer";

const cx = classNames.bind(styles);

const HomePages = () => {
  return (
    <>
      <div className={cx("home")}>
        <Header />
        <Banner1 />
        <Banner2 />
        <Panel />
        <Feedback />
        <Footer />
      </div>
    </>
  );
};

export default HomePages;
