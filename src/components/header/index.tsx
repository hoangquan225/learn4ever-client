import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import logo from "../../assets/img/logo.png";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const cx = classNames.bind(styles);

const Header = () => {
  const userInfo = useAppSelector((state: RootState) => state.authState.userInfo)

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("wide", "header__wrapper")}>
          <div className={cx("header__container")}>
            <Link to={"/"} className={cx("header__link")}>
              <div className={cx("header__logo")}>
                <img src={logo} alt="logo" className={cx("header__img")} />
              </div>
            </Link>
            <div className={cx("header__nav")}>
              <div className={cx("header__auth")}>
                {!userInfo?._id ?
                  <div>
                    <Link to={"/login"} className={cx("header__btn--link")}>
                      <button className={cx("header__button")}>
                        Đăng nhập
                      </button>
                    </Link>
                    <Link to={"/register"} className={cx("header__btn--link")}>
                      <button className={cx("header__button")}>
                        Đăng ký
                      </button>
                    </Link>
                  </div> :
                  <Link to={"/profile"} className={cx("header__btn--link")}>
                    <button className={cx("header__button")}>
                      <UserOutlined />
                    </button>
                  </Link>}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
