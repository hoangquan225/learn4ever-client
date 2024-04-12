import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Tooltip, notification } from "antd";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  requestForgotPassword,
  requestLogin,
} from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import TTCSconfig from "../../submodule/common/config";
import { encrypt } from "../../submodule/utils/crypto";
import styles from "./reset-password.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const cx = classNames.bind(styles);

const ResetPasswordPages = () => {
  const userInfo = useAppSelector(
    (state: RootState) => state.authState.userInfo
  );
  const loading = useAppSelector((state: RootState) => state.authState.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const handleForgotPassword: any = async (email: string) => {
    try {
      const actionResult = await dispatch(
        requestForgotPassword({email})
      );
      const res = unwrapResult(actionResult);
      console.log({res});
      
      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          return notification.error({
            message: "Đăng nhập thất bại",
            duration: 1.5,
          });
        case TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST:
          return notification.warning({
            message: "Tài khoản hoặc mật khẩu không đúng",
            duration: 1.5,
          });
        case TTCSconfig.LOGIN_WRONG_PASSWORD:
          return notification.warning({
            message: "Tài khoản hoặc mật khẩu không đúng",
            duration: 1.5,
          });
        case TTCSconfig.LOGIN_SUCCESS:
          Cookies.set("token", res.token, {
            expires: 60 * 60 * 24 * 30,
          });
          return notification.success({
            message: "Đăng nhập thành công",
            duration: 1.5,
          });
      }
    } catch (err) {
      return notification.error({
        message: "Đăng nhập thất bại, lỗi server",
        duration: 1.5,
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
            name="normal_login"
            className={cx("login__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={handleForgotPassword}
          >
            <Form.Item
              name="password"
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
            >
              <div className={cx("reset-password-text")}>Mật khẩu mới</div>
              <Input.Password
                prefix={
                  <LockOutlined
                    className={cx("site-form-item-icon input__icon")}
                    style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                  />
                }
                type="password"
                style={{ padding: "12px" }}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
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
            >
              <div className={cx("reset-password-text")}>Xác nhận mật khẩu</div>
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
                loading={loading}
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
