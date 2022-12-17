/* eslint-disable jsx-a11y/anchor-is-valid */
// import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import logo from "../../assets/img/logo.png";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <>
      <header className={cx("header")}>
        <div className={cx("wide", "header__wrapper")}>
          <div className={cx("header__container")}>
            <div className={cx("header__logo")}>
              <Link to={"/"} className={cx("header__link")}>
                <img src={logo} alt="logo" className={cx("header__img")} />
              </Link>
            </div>
            <div className={cx("header__nav")}>
              <div className={cx("header__auth")}>
                <button className={cx("header__button")}>
                  <Link to={"/login"} className={cx("header__btn--link")}>
                    Đăng nhập
                  </Link>
                </button>
                <button className={cx("header__button")}>
                  <Link to={"/register"} className={cx("header__btn--link")}>
                    Đăng ký
                  </Link>
                </button>
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
