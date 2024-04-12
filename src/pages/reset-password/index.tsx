import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, notification } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { apiCheckTokenExpires, apiResetPassword } from "../../api/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import TTCSconfig from "../../submodule/common/config";
import styles from "./reset-password.module.scss";
import { requestCheckTokenExpires, requestResetPassword } from "../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../../components/loading";

const cx = classNames.bind(styles);

const ResetPasswordPages = () => {
  const data = useAppSelector(
    (state: RootState) => state.authState.data
  );
  const loadingForgot = useAppSelector((state: RootState) => state.authState.loadingForgot);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tokenResetPass, setTokenResetPass] = useState<string>("");
  const {token} = useParams();

  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    checkTokenExpires(token || "")
    setTokenResetPass(token || "")
  }, [token]);  

  const checkTokenExpires = async (token: string) => {
    try {
      // const res = await apiCheckTokenExpires({token})
      const actionResult = await dispatch(
        requestCheckTokenExpires({token})
      );
      const res = unwrapResult(actionResult);
      console.log({res});
      if(res.status === TTCSconfig.STATUS_FAIL || !res.data) {
        navigate("/")
        return notification.error({
          message: res.message ? res.message : "Thất bại! Mã không hợp lệ",
          duration: 2.5,
        });
      } 
    } catch (err) {
      return notification.error({ 
        message: "Hệ thống đang xảy ra xử cố, vui lòng thử lại sau!",
        duration: 2.5,
      });
    }
  }

  const handleResetPassword = async (data: any) => {
    try {
      const actionResult = await dispatch(
        requestResetPassword({token: tokenResetPass, newPassword: data.password})
      );
      const res = unwrapResult(actionResult);
      // const res = await apiResetPassword({token: tokenResetPass, newPassword: data.password})
      switch (res.status) {
        case TTCSconfig.LOGIN_SUCCESS:
          notification.success({
            message: res.message ? res.message : "Thành công",
            duration: 2.5,
          });
          navigate("/dang-nhap")
          break;
        case TTCSconfig.STATUS_FAIL:
          notification.error({
            message: res.message ? res.message : "Thất bại",
            duration: 2.5,
          });
          navigate("/")
          break;
      }
    } catch (err) {
      return notification.error({
        message: "Đăng nhập thất bại, lỗi server",
        duration: 2.5,
      });
    }
  };

  return (
    <>
      <div className={cx("login__over")}>
        <div className={cx("login__wrapper")}>
          <Tooltip placement="top" title="Quay lại Trang chủ">
            <div className={cx("arrow__back")} onClick={backToHome}>
              <FaArrowLeft />
            </div>
          </Tooltip>
          <h2 className={cx("login__title")}>Cài lại mật khẩu</h2>
          <Form
            name="reset-password"
            className={cx("login__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={handleResetPassword}
            layout="vertical"
          >
            <Form.Item
              name="password"
              className={cx("reset-password__item")}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này!",
                },
                {
                  message: "Mật khẩu phải có ít nhất 8 ký tự",
                },
                {
                  min: 8,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*])/,
                  message:
                    "Mật khẩu phải có ít nhất 8 ký tự, phải chứa nhất một ký tự đặc biệt, một chữ hoa, một chữ thường và một số",
                },
              ]}
              label="Mật khẩu mới"
            >
              {/* <label className={cx("reset-password-text")}>Mật khẩu mới</label> */}
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
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              className={cx("reset-password__item")}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
              label="Xác nhận mật khẩu"
            >
              {/* <div className={cx("reset-password-text")}>Xác nhận mật khẩu</div> */}
              <Input.Password
                prefix={
                  <LockOutlined
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                type="password"
                placeholder="Xác nhận mật khẩu"
                style={{ padding: "12px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={cx("login-form-button")}
                loading={loadingForgot}
              >
                Cài lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPages;
