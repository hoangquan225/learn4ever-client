import {
  ContactsOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Select, notification, Tooltip } from "antd";
import React, { useEffect } from "react";

import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { EmailRegExp } from "../../submodule/utils/validation";
import { encrypt } from "../../submodule/utils/crypto";
import TTCSconfig from "../../submodule/common/config";
import { Link, useNavigate } from "react-router-dom";
import { requestRegister } from "../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import Cookies from "js-cookie";
import { classes, genders } from "../../utils/contants";
import { FaArrowLeft } from "react-icons/fa";

const cx = classNames.bind(styles);

const RegisterPages = () => {
  const userInfo = useAppSelector(
    (state: RootState) => state.authState.userInfo
  );

  const loading = useAppSelector((state: RootState) => state.authState.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // lay token tu cookie

  useEffect(() => {
    if (userInfo?._id) {
      navigate(-1);
    }
  }, [userInfo]);

  const backToHome = () => {
    navigate("/");
  };

  const handleRegister = async (data: any) => {
    const { confirm, ...rest } = data;
    try {
      const encodePassword = encrypt(data.password);
      // const res: any = await apiRegister({
      //   ...rest,
      //   password: encodePassword
      // })
      const actionResult = await dispatch(
        requestRegister({
          ...rest,
          password: encodePassword,
        })
      );
      const res = unwrapResult(actionResult);

      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          return notification.error({
            message: "Đăng ký thất bại",
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_ACCOUNT_IS_USED:
          return notification.warning({
            message: "Tài khoản đã tồn tại",
            duration: 1.5,
          });
        
        case TTCSconfig.LOGIN_EMAIL_IS_USED:
          return notification.warning({
            message: "Email đã tồn tại",
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_SUCCESS:
          Cookies.set("token", res.token, {
            expires: 60 * 60 * 24 * 30,
          });
          return notification.success({
            message: "Đăng ký thành công",
            duration: 1.5,
          });
      }
    } catch (err) {
      notification.error({
        message: "Đăng ký thất bại, lỗi server",
        duration: 1.5,
      });
    }
  };

  return (
    <>
      <div className={cx("register__over")}>
        <div className={cx("register__wrapper")}>
          <Tooltip placement="top" title="Quay lại Trang chủ">
            <div className={cx("arrow__back")} onClick={backToHome}>
              <FaArrowLeft />
            </div>
          </Tooltip>
          <h2 className={cx("register__title")}>Tạo tài khoản</h2>
          <Form
            name="register"
            className={cx("register__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={handleRegister}
          >
            <Row gutter={16}>
              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="account"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập trường này!",
                    },
                    {
                      min: 6,
                      max: 15,
                      message: "Tên tài khoản phải có 6-15 ký tự",
                    },
                    {
                      pattern: /^[a-zA-Z0-9_.-]+$/,
                      message:
                        "Tên đăng nhập chỉ chứa các kí tự cho phép gồm: chữ in hoa, chữ in thường, chữ số (a-z, A-Z, 0-9), dấu gạch dưới, dấu gạch ngang và dấu chấm.",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <UserAddOutlined
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Nhập tài khoản"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      pattern: EmailRegExp,
                      message: "Email không đúng định dạng!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập trường này!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Nhập email"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="name"
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
                    placeholder="Nhập tên"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: /^0\d{9}$/,
                      message: "Định dạng số điện thoại không đúng",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập trường này!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <PhoneOutlined
                        className={cx("site-form-item-icon input__icon")}
                        style={{ fontSize: "1.8rem", marginRight: "0.8rem" }}
                      />
                    }
                    placeholder="Nhập số điện thoại"
                    style={{ padding: "12px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giới tính!",
                    },
                  ]}
                >
                  <Select
                    className={cx("register__select")}
                    allowClear
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        <WomanOutlined
                          className={cx("site-form-item-icon input__icon")}
                          style={{
                            fontSize: "1.8rem",
                            marginRight: "0.8rem",
                            color: "#000",
                          }}
                        />
                        &nbsp; Chọn giới tính
                      </React.Fragment>
                    }
                    size={"large"}
                  >
                    {genders?.map((data) => (
                      <Select.Option
                        value={data.value}
                        key={data.value}
                        label={
                          <React.Fragment>
                            <WomanOutlined
                              className={cx("site-form-item-icon input__icon")}
                              style={{
                                fontSize: "1.8rem",
                                marginRight: "0.8rem",
                              }}
                            />
                            &nbsp;
                            {data.label}
                          </React.Fragment>
                        }
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="classNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn lớp!",
                    },
                  ]}
                >
                  <Select
                    className={cx("register__select")}
                    allowClear
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        <ContactsOutlined
                          className={cx("site-form-item-icon input__icon")}
                          style={{
                            fontSize: "1.8rem",
                            marginRight: "0.8rem",
                            color: "#000",
                          }}
                        />
                        &nbsp; Chọn lớp
                      </React.Fragment>
                    }
                    size={"large"}
                    listHeight={128}
                  >
                    {classes?.map((data) => (
                      <Select.Option
                        value={data.value}
                        key={data.value}
                        label={
                          <React.Fragment>
                            <ContactsOutlined
                              className={cx("site-form-item-icon input__icon")}
                              style={{
                                fontSize: "1.8rem",
                                marginRight: "0.8rem",
                              }}
                            />
                            &nbsp;
                            {data.label}
                          </React.Fragment>
                        }
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
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
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  //   hasFeedback
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
              </Col>

              <Col className="gutter-row" span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("register-form-button")}
                    loading={loading}
                  >
                    Đăng ký
                  </Button>
                  <div className={cx("register__or")}>
                    <span className={cx("register__ortext")}>HOẶC</span>
                  </div>
                  <div className={cx("register__tologin")}>
                    Bạn đã có tài khoản?{" "}
                    <Link
                      to="/dang-nhap"
                      className={cx("register__tologinlink")}
                    >
                      Đăng nhập ngay!
                    </Link>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPages;
