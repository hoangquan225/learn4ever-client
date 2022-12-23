import { BarChartOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import logo from "../../assets/img/logo.png";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { Dropdown, MenuProps } from "antd";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { AiOutlineUser } from "react-icons/ai";

const cx = classNames.bind(styles);

const Header = () => {
  const userInfo = useAppSelector((state: RootState) => state.authState.userInfo)
  
  const handleLogout = useCallback(() => {
		Cookies.remove("token")
		window.location.href = "/"
	}, [])

  const items: MenuProps['items'] = [
    {
      label: <Link to={"/profile"}>{userInfo?.name}</Link>,
      key: '0',
      icon: <ProfileOutlined />,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem'
      },
    },
    {
      label: <Link to={"/achievement"}>Kết Quả Học Tập</Link>,
      key: '1',
      icon: <BarChartOutlined />,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem'
      },
    },
    {
      label: "Đăng xuất",
      key: '3',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem'
      },
    },
  ];
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
                  <>
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
                  </> :
                    <Dropdown 
                      menu={{ items }} 
                      trigger={['hover']}
                      placement={'bottomRight'}
                      >
                      <button  className={cx("header__button")}>
                        <AiOutlineUser />
                      </button>
                    </Dropdown> 
                  }
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
