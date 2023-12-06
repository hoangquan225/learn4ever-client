import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./achievement.module.scss";
const cx = classNames.bind(styles);

const AchievementPages = () => {
  return (
    <>
      <div className={cx("achievement")}>
        <Header />
        <Footer />
      </div>
    </>
  );
};

export default AchievementPages;
