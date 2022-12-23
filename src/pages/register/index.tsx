import {
  ContactsOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Select, notification, message } from "antd";
import React, { useEffect } from "react";

import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { EmailRegExp, isValidPhone, PhoneRegExp } from "../../submodule/utils/validation";
import { encrypt } from "../../submodule/utils/crypto";
import TTCSconfig from "../../submodule/common/config";
import { Link, useNavigate } from "react-router-dom";
import { NotificationPlacement } from "antd/es/notification/interface";
import { requestRegister } from "../../redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

const RegisterPages = () => {
  const [api, contextHolder] = notification.useNotification();
  const userInfo = useAppSelector((state: RootState) => state.authState.userInfo)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // lay token tu cookie

  useEffect(() => {
    console.log(userInfo?._id);
    if (userInfo?._id) {
      navigate('/')
    }
  }, [userInfo])

  const genderData = [
    {
      label: "Nam",
      value: 0
    },
    {
      label: "Nữ",
      value: 1
    },
    {
      label: "Khác",
      value: 2
    }
  ];
  const classData = [
    {
      label: "Lớp 1",
      value: 1
    },
    {
      label: "Lớp 2",
      value: 2
    },
    {
      label: "Lớp 3",
      value: 3
    },
    {
      label: "Lớp 4",
      value: 4
    },
    {
      label: "Lớp 5",
      value: 5
    },
    {
      label: "Lớp 6",
      value: 6
    },
    {
      label: "Lớp 7",
      value: 7
    },
    {
      label: "Lớp 8",
      value: 8
    },
    {
      label: "Lớp 9",
      value: 9
    },
    {
      label: "Lớp 10",
      value: 10
    },
    {
      label: "Lớp 11",
      value: 11
    },
    {
      label: "Lớp 12",
      value: 12
    },
  ];

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

  const handleRegister = async (data: any) => {
    const { confirm, ...rest } = data;
    try {
      const encodePassword = encrypt(data.password)
      // const res: any = await apiRegister({
      //   ...rest,
      //   password: encodePassword
      // })
      const actionResult = await dispatch(requestRegister({
        ...rest,
        password: encodePassword
      }))
      const res = unwrapResult(actionResult);

      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          console.log("LOGIN_FAILED " + TTCSconfig.LOGIN_FAILED);
          
          return handleMessage("Đăng ký thất bại", "warning");

        case TTCSconfig.LOGIN_ACCOUNT_IS_USED:
          console.log("LOGIN_ACCOUNT_IS_USED " + TTCSconfig.LOGIN_ACCOUNT_IS_USED);
          return handleMessage("ton tai", "success");

        case TTCSconfig.LOGIN_SUCCESS:
          console.log("LOGIN_SUCCESS " + TTCSconfig.LOGIN_SUCCESS);
          Cookies.set("token", res.token, {
            expires: 60 * 60 * 24 * 30  
          })

          return handleMessage("Đăng ký thành công", "success");
      }
    } catch (err) {
      handleMessage("Đăng ký thất bại", "warning");
    }
  }

  const handleMessage = (toastMessage: any, type: any) => openNotification('topRight', toastMessage, type)

  return (
    <>
      <div className={cx("register__over")}>
        <div className={cx("register__wrapper")}>
          <h2 className={cx("register__title")}>Tạo tài khoản</h2>
          {contextHolder}
          <Form
            name="register"
            className={cx("register__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={handleRegister}
          >
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
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

              <Col className="gutter-row" span={12}>
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

              <Col className="gutter-row" span={12}>
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

              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: PhoneRegExp,
                      message: "vui lòng nhập số điện thoại",
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

              <Col className="gutter-row" span={12}>
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
                    {genderData.map((data) => (
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

              <Col className="gutter-row" span={12}>
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
                    {classData.map((data) => (
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

              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập trường này!",
                    },
                  ]}
                //   hasFeedback
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

              <Col className="gutter-row" span={12}>
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
                  >
                    Đăng ký
                  </Button>
                  <div className={cx("register__or")}>
                    <span className={cx("register__ortext")}>HOẶC</span>
                  </div>
                  <div className={cx("register__tologin")}>
                    Bạn đã có tài khoản?{" "}
                    <Link to="/login" className={cx("register__tologinlink")}>
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
