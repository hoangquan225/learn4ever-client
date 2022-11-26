import { useEffect } from "react";
import { getPost } from "../../api/services";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import classNames from "classnames/bind";
import styles from "./login.module.scss";

const cx = classNames.bind(styles);

export const LoginPages = () => {
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const data = await getPost();
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div className={cx("login__over")}>
        <div className={cx("login__wrapper")}>
          <h2 className={cx("login__title")}>Đăng Nhập</h2>
          <Form
            name="normal_login"
            className={cx("login__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
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
                <a href="/" className={cx("login__toregisterlink")}>
                  Đăng ký ngay!
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
