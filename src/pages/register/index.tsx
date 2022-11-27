import {
  ContactsOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Select } from "antd";
import classNames from "classnames/bind";
import React from "react";
import styles from "./register.module.scss";
import {isValidPhone, PhoneRegExp} from "../../submodule/utils/validation";

const cx = classNames.bind(styles);

export const RegisterPages = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const genderData = ["Nam", "Nữ", "Khác"];
  const classData = ["Lớp 10", "Lớp 11", "Lớp 12"];

  return (
    <>
      <div className={cx("register__over")}>
        <div className={cx("register__wrapper")}>
          <h2 className={cx("register__title")}>Tạo tài khoản</h2>
          <Form
            name="register"
            className={cx("register__form")}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
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
                      type: "email",
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
                  name="phone"
                  rules={[
                    {
                      pattern: PhoneRegExp,
                      message: 'vui lòng nhập số điện thoại',
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
                        value={data}
                        key={data}
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
                            {data}
                          </React.Fragment>
                        }
                      >
                        {data}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="class"
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
                  >
                    {classData.map((data) => (
                      <Select.Option
                        value={data}
                        key={data}
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
                            {data}
                          </React.Fragment>
                        }
                      >
                        {data}
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
                    <a href="/" className={cx("register__tologinlink")}>
                      Đăng nhập ngay!
                    </a>
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
