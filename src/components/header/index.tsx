// import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import logo from "../../assets/img/logo.png";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <>
      <header className={cx("header")}>
        <div className={cx("wide")}>
          <div className={cx("header__container")}>
            <div className={cx("header__logo")}>
              <a href="/" className={cx("header__link")}>
                <img src={logo} alt="logo" className={cx("header__img")} />
              </a>
            </div>
            <div className={cx("header__nav")}>
              <div className={cx("header__auth")}>
                <button className={cx("header__button")}>Đăng nhập</button>
                <button className={cx("header__button")}>Đăng ký</button>
                {/* <button className={cx("header__button")}>
                  <UserOutlined />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
