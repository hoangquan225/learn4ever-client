import { useEffect, useMemo, useState } from "react";
import { apiLogin, getPost } from "../../api/services";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, notification } from "antd";

import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import { encrypt } from "../../submodule/utils/crypto";
import TTCSconfig from "../../submodule/common/config";
import { NotificationPlacement } from "antd/es/notification/interface";

const cx = classNames.bind(styles);

const LoginPages = () => {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    // getPosts();
  }, []);

  const openNotification = (placement: NotificationPlacement, toastMessage: any, type: any) => {
    switch (type) {
      case "warning":
        api.warning({
          message: `${toastMessage}`,
          placement,
        });
        break;

      case "info":
        api.info({
          message: `${toastMessage}`,
          placement,
        });
        break;

      case "success":
        api.success({
          message: `${toastMessage}`,
          placement,
        });
        break;

      case "error":
        api.error({
          message: `${toastMessage}`,
          placement,
        });
        break;
    }
  };

  // const getPosts = async () => {
  //   try {
  //     const data = await getPost();
  //     console.log(data);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  const handleLogin: any = async (data: {
    account: string,
    password: string
  }) => {
    try {
      console.log(data);
      const encodePassword = encrypt(data.password)
      const res: any = await apiLogin({ account: data.account, password: encodePassword })
      console.log(res);

      switch (res.data.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          console.log("LOGIN_FAILED " + TTCSconfig.LOGIN_FAILED);
          return handleMessage("Đăng nhập thất bại", "warning");

        case TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST:
          console.log("LOGIN_ACCOUNT_NOT_EXIST " + TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST);
          return handleMessage("Tài khoản hoặc mật khẩu không đúng", "warning");

        case TTCSconfig.LOGIN_WRONG_PASSWORD:
          console.log("LOGIN_WRONG_PASSWORD " + TTCSconfig.LOGIN_WRONG_PASSWORD);
          return handleMessage("Tài khoản hoặc mật khẩu không đúng", "warning");

        case TTCSconfig.LOGIN_SUCCESS:
          console.log("LOGIN_SUCCESS " + TTCSconfig.LOGIN_SUCCESS);
          return handleMessage("Đăng nhập thành công", "success");
      }
    } catch (err) {
      console.log("err");
      handleMessage("Đăng nhập thất bại", "warning");
    }
  }

  const handleMessage = (toastMessage: any, type: any) => openNotification('topRight', toastMessage, type)

  return (
    <>
      <div className={cx("login__over")}>
        <div className={cx("login__wrapper")}>
          <h2 className={cx("login__title")}>Đăng Nhập</h2>
          {contextHolder}
          <Form
            name="normal_login"
            className={cx("login__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này!",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                placeholder="Nhập tài khoản"
                style={{ padding: "12px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                type="password"
                placeholder="Nhập mật khẩu"
                style={{ padding: "12px" }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Duy trì đăng nhập</Checkbox>
              </Form.Item>

              <a className={cx("login-form-forgot")} href="/">
                Quên mật khẩu
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={cx("login-form-button")}
              >
                Đăng nhập
              </Button>
              <div className={cx("login__or")}>
                <span className={cx("login__ortext")}>HOẶC</span>
              </div>
              <div className={cx("login__toregister")}>
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className={cx("login__toregisterlink")}>
                  Đăng ký ngay!
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPages;
