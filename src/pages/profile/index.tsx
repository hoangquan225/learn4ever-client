import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { AvatarIcon } from "../../components/icons/icons";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import {
  FaRegUser,
  FaRegEnvelope,
  FaPhone,
  FaRegCalendarAlt,
  FaTransgender,
  FaRegAddressCard,
} from "react-icons/fa";
import styles from "./profile.module.scss";
import React, { useEffect, useState } from "react";
import { EmailRegExp, PhoneRegExp } from "../../submodule/utils/validation";
import { classes, genders } from "../../utils/contants";
import { LockOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const ProfilePages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [infoForm] = Form.useForm();
  const [modalForm] = Form.useForm();

  const userInfo = useAppSelector(
    (state: RootState) => state.authState.userInfo,
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.authState.loadingCheckLogin,
  );

  console.log({ isLoading });

  useEffect(() => {
    infoForm.setFieldsValue({
      name: userInfo?.name,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
      birth: userInfo?.birth,
      classNumber: userInfo?.classNumber,
      gender: userInfo?.gender,
    });
  }, [infoForm]);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOkModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    infoForm.validateFields().then((value) => {
      console.log(value);
    });
  };

  const handleCancelModal = () => {
    modalForm.setFieldsValue({
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={cx("profile")}>
        <Header />

        <div className={cx("profile__container")}>
          <div className={cx("wide")}>
            <div className={cx("profile__wrapper")}>
              <div className={cx("profile__title")}>Thông tin cá nhân</div>
              <div className={cx("profile__box")}>
                <Form
                  name="profile"
                  className={cx("profile__form")}
                  form={infoForm}
                  // onFinish={onFinish}
                >
                  <Row>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <div className={cx("profile__avatar")}>
                        <AvatarIcon className={cx("profile__icon")} />
                      </div>
                      <div className={cx("profile__username")}>
                        {userInfo?.account}
                      </div>
                    </Col>

                    <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                      <Row gutter={16}>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
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
                                <FaRegUser
                                  style={{
                                    fontSize: "1.8rem",
                                    marginRight: "0.8rem",
                                  }}
                                />
                              }
                              placeholder="Nhập tên"
                              style={{ padding: "16px" }}
                              value={userInfo?.name}
                            />
                          </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
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
                                <FaRegEnvelope
                                  style={{
                                    fontSize: "1.8rem",
                                    marginRight: "0.8rem",
                                  }}
                                />
                              }
                              placeholder="Nhập email"
                              style={{ padding: "16px" }}
                              value={userInfo?.email}
                            />
                          </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
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
                                <FaPhone
                                  style={{
                                    fontSize: "1.8rem",
                                    marginRight: "0.8rem",
                                  }}
                                />
                              }
                              placeholder="Nhập số điện thoại"
                              style={{ padding: "16px" }}
                              value={userInfo?.phoneNumber}
                            />
                          </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
                            name="birth"
                          >
                            <DatePicker
                              suffixIcon={<FaRegCalendarAlt />}
                              placeholder="Chọn ngày sinh"
                              format={"DD/MM/YYYY"}
                              allowClear={false}
                              showToday={false}
                              className={cx("profile__datepicker")}
                              // value={userInfo?.birth}
                            />
                          </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
                            name="classNumber"
                          >
                            <Select
                              className={cx("profile__select")}
                              optionLabelProp="label"
                              placeholder={
                                <React.Fragment>
                                  <FaRegAddressCard
                                    style={{
                                      fontSize: "1.8rem",
                                      marginRight: "0.8rem",
                                      marginTop: "0.8rem",
                                      color: "#000",
                                    }}
                                  />
                                  &nbsp; Chọn lớp
                                </React.Fragment>
                              }
                              size={"large"}
                              listHeight={128}
                              value={userInfo?.classNumber}
                            >
                              {classes.map((data) => (
                                <Select.Option
                                  value={data.value}
                                  key={data.value}
                                  label={
                                    <React.Fragment>
                                      <FaRegAddressCard
                                        style={{
                                          fontSize: "1.8rem",
                                          marginRight: "0.8rem",
                                          marginTop: "0.8rem",
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

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Form.Item
                            className={cx("profile__formitem")}
                            name="gender"
                          >
                            <Select
                              className={cx("profile__select")}
                              optionLabelProp="label"
                              placeholder={
                                <React.Fragment>
                                  <FaTransgender
                                    style={{
                                      fontSize: "1.8rem",
                                      marginRight: "0.8rem",
                                      marginTop: "0.8rem",
                                      color: "#000",
                                    }}
                                  />
                                  &nbsp; Chọn giới tính
                                </React.Fragment>
                              }
                              size={"large"}
                              listHeight={128}
                              value={userInfo?.gender}
                            >
                              {genders.map((data) => (
                                <Select.Option
                                  value={data.value}
                                  key={data.value}
                                  label={
                                    <React.Fragment>
                                      <FaTransgender
                                        style={{
                                          fontSize: "1.8rem",
                                          marginRight: "0.8rem",
                                          marginTop: "0.8rem",
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
                          xl={24}
                          lg={24}
                          md={24}
                          sm={24}
                          xs={24}
                          className={cx("profile__group--btn")}
                        >
                          <button
                            className={cx("btn-change", "profile__button")}
                            onClick={handleShowModal}
                          >
                            Đổi mật khẩu
                          </button>

                          <Modal
                            className={cx("profile__modal")}
                            open={isModalOpen}
                            onOk={handleOkModal}
                            onCancel={handleCancelModal}
                            footer={[
                              <Button
                                key="changePassword"
                                className={cx("profile__button", "btn-modal")}
                                onClick={handleOkModal}
                              >
                                Xác nhận
                              </Button>,
                            ]}
                          >
                            <h2 className={cx("profile__modal--title")}>
                              Đổi mật khẩu
                            </h2>
                            <Form
                              className={cx("profile__modal--form")}
                              form={modalForm}
                              name="modal"
                            >
                              <Form.Item
                                name="password"
                                className={cx("profile__formitem")}
                              >
                                <Input
                                  prefix={
                                    <LockOutlined
                                      style={{
                                        fontSize: "1.8rem",
                                        marginRight: "0.8rem",
                                      }}
                                    />
                                  }
                                  type="password"
                                  placeholder="Mật khẩu hiện tại"
                                  style={{ padding: "1.6rem" }}
                                />
                              </Form.Item>
                              <Form.Item
                                name="newPassword"
                                className={cx("profile__formitem")}
                                dependencies={["password"]}
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (
                                        !value ||
                                        getFieldValue("password") !== value
                                      ) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error(
                                          "Mật khẩu mới phải khác mật khẩu hiện tại!",
                                        ),
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <Input
                                  prefix={
                                    <LockOutlined
                                      style={{
                                        fontSize: "1.8rem",
                                        marginRight: "0.8rem",
                                      }}
                                    />
                                  }
                                  type="password"
                                  placeholder="Mật khẩu mới"
                                  style={{ padding: "1.6rem" }}
                                />
                              </Form.Item>
                              <Form.Item
                                name="confirmNewPassword"
                                className={cx("profile__formitem")}
                                dependencies={["newPassword"]}
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                      ) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error("Mật khẩu không trùng khớp!"),
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <Input
                                  prefix={
                                    <LockOutlined
                                      style={{
                                        fontSize: "1.8rem",
                                        marginRight: "0.8rem",
                                      }}
                                    />
                                  }
                                  type="password"
                                  placeholder="Xác nhận mật khẩu"
                                  style={{ padding: "1.6rem" }}
                                />
                              </Form.Item>
                            </Form>
                          </Modal>

                          <button
                            className={cx("btn-update", "profile__button")}
                            onClick={handleUpdate}
                          >
                            Cập nhật
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProfilePages;
