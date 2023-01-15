import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Modal,
  Progress,
  Radio,
  Row,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  FaMarker,
  FaRegCheckCircle,
  FaRegClock,
  FaRegPauseCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "../../components/header";
import styles from "./practice.module.scss";

const cx = classNames.bind(styles);

const PracticePages = () => {
  const [clockStick, setClockStick] = useState(false);
  const [openQuestionList, setOpenQuestionList] = useState(false);
  const [isOpenModelPause, setIsOpenModelPause] = useState(false);
  const [isOpenModelSubmit, setIsOpenModelSubmit] = useState(false);
  const [isOpenModelFeedback, setIsOpenModelFeedback] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleClockStick);

    return () => {
      window.removeEventListener("scroll", handleClockStick);
    };
  }, []);

  const handleClockStick = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 180
        ? setClockStick(!clockStick)
        : setClockStick(clockStick);
    }
  };

  const handleCloseQuestionList = () => {
    setOpenQuestionList(false);
  };

  const handleShowQuestionList = () => {
    setOpenQuestionList(!openQuestionList);
  };

  const handleOpenModelPause = () => {
    setIsOpenModelPause(true);
  };

  const handleOpenModelSubmit = () => {
    setIsOpenModelSubmit(true);
  };

  const handleOpenModelFeedback = () => {
    setIsOpenModelFeedback(true);
  };

  const handlePauseOk = () => {};

  const handleSubmitOk = () => {};

  const handleFeedbackOk = () => {};

  const handleCancel = () => {
    setIsOpenModelPause(false);
    setIsOpenModelSubmit(false);
    setIsOpenModelFeedback(false);
  };

  return (
    <>
      <Header />
      <div className={cx("practice")}>
        <div className={cx("wide")}>
          <div className={cx("practice__wrapper")}>
            <div className={cx("practice__container")}>
              <div className={cx("practice__breadcumb")}>
                <Breadcrumb separator="›">
                  <Breadcrumb.Item>
                    <NavLink
                      to={"/"}
                      className={cx("practice__breadcumb--link")}
                    >
                      Trang chủ
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={"/introduce"}
                      className={cx("practice__breadcumb--link", "active")}
                    >
                      practice
                    </NavLink>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h1 className={cx("practice__heading")}>
                Đề kiểm tra cuối học kì 2 môn Vật Lý 12 - Đề số 1
              </h1>

              <Row gutter={10} className={cx("practice__view")}>
                <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                  <Row
                    className={
                      clockStick
                        ? cx("practice__clock--panel", "stick")
                        : cx("practice__clock--panel")
                    }
                    onScroll={handleClockStick}
                  >
                    <FaRegClock className={cx("practice__clock--icon")} />
                    <span className={cx("practice__clock--time")}>
                      00:47:43
                    </span>
                  </Row>

                  <div>
                    <Row className={cx("practice__practice")}>
                      <div className={cx("practice__practice--item")}>
                        <div className={cx("feedback-icon--wrapper")}>
                          <FaMarker
                            className={cx("feedback-icon")}
                            onClick={handleOpenModelFeedback}
                          />
                        </div>
                        <div className={cx("game__view")}>
                          <div className={cx("game__view--question")}>
                            <div className={cx("game__view--question-index")}>
                              <span>1.</span>
                            </div>
                            <div className={cx("game__view--question-text")}>
                              Trong thí nghiệm Y-âng về giao thoa ánh sáng, khe
                              hẹp S phát ra đồng thời 2 bức xạ đơn sắc có bước
                              sóng λ<sub>1</sub> &nbsp;= 4410A <sub>o</sub>
                              &nbsp;và λ<sub>2</sub>. Trên màn trong khoảng giữa
                              2 vân sáng liên tiếp có màu giống màu của vân
                              trung tâm còn có 9 vân sáng khác. Biết rằng 0,38
                              μm ≤ λ ≤ 0,76 μm. Giá trị của λ<sub>2</sub>{" "}
                              &nbsp;bằng:
                            </div>
                          </div>

                          <div className={cx("game__view--quiz-choices")}>
                            <div className={cx("quiz-choices__item")}>
                              <Radio.Group name="radiogroup">
                                <Space direction="vertical">
                                  <Radio value={1}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={2}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={3}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={4}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                </Space>
                              </Radio.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row className={cx("practice__practice")}>
                      <div className={cx("practice__practice--item")}>
                        <div className={cx("feedback-icon--wrapper")}>
                          <FaMarker
                            className={cx("feedback-icon")}
                            onClick={handleOpenModelFeedback}
                          />
                        </div>
                        <div className={cx("game__view")}>
                          <div className={cx("game__view--question")}>
                            <div className={cx("game__view--question-index")}>
                              <span>1.</span>
                            </div>
                            <div className={cx("game__view--question-text")}>
                              Trong thí nghiệm Y-âng về giao thoa ánh sáng, khe
                              hẹp S phát ra đồng thời 2 bức xạ đơn sắc có bước
                              sóng λ<sub>1</sub> &nbsp;= 4410A <sub>o</sub>
                              &nbsp;và λ<sub>2</sub>. Trên màn trong khoảng giữa
                              2 vân sáng liên tiếp có màu giống màu của vân
                              trung tâm còn có 9 vân sáng khác. Biết rằng 0,38
                              μm ≤ λ ≤ 0,76 μm. Giá trị của λ<sub>2</sub>{" "}
                              &nbsp;bằng:
                            </div>
                          </div>

                          <div className={cx("game__view--quiz-choices")}>
                            <div className={cx("quiz-choices__item")}>
                              <Radio.Group name="radiogroup">
                                <Space direction="vertical">
                                  <Radio value={1}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={2}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={3}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                  <Radio value={4}>
                                    <div
                                      className={cx(
                                        "quiz-choices__item--answer"
                                      )}
                                    >
                                      A. 7717,5 Å
                                    </div>
                                  </Radio>
                                </Space>
                              </Radio.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>

                <Col xl={8} lg={8} md={0} sm={0} xs={0}>
                  <div className={cx("practice__palette--panel")}>
                    <div className={cx("practice__palette--main")}>
                      <div className={cx("practice__p alette--header")}>
                        <div className={cx("practice__palette--title")}>
                          Bảng câu hỏi
                        </div>
                      </div>
                      <div className={cx("practice__palette--body")}>
                        <div className={cx("practice__palette--progress")}>
                          <Progress
                            percent={50}
                            status="active"
                            strokeColor={"#009d9d"}
                            showInfo={false}
                          />
                          <div
                            className={cx("practice__palette--progress-title")}
                          >
                            20/40
                          </div>
                        </div>

                        <div className={cx("practice__palette--question-list")}>
                          <Row
                            style={{
                              marginTop: "0.4rem",
                            }}
                            gutter={[0, 16]}
                          >
                            <Col span={3} className={cx("question-item")}>
                              <span
                                className={cx(
                                  "question-item__bground",
                                  "active"
                                )}
                              >
                                1
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                2
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                3
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                4
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                5
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                6
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                7
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                8
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                18
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                18
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                18
                              </span>
                            </Col>
                            <Col span={3} className={cx("question-item")}>
                              <span className={cx("question-item__bground")}>
                                18
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div className={cx("practice__palette--footer")}>
                        <div className={cx("btn-group")}>
                          <button
                            className={cx("btn")}
                            onClick={handleOpenModelPause}
                          >
                            Tạm dừng
                          </button>
                          <button
                            className={cx("btn", "btn__submit")}
                            onClick={handleOpenModelSubmit}
                          >
                            Nộp bài
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className={cx("practice__subnav")}>
                <div className={cx("practice__subnav--main")}>
                  <div className={cx("practice__subnav--item")}>
                    <FaRegPauseCircle
                      className={cx("practice__subnav--item-icon")}
                    />
                    <div className={cx("practice__subnav--item-label")}>
                      Tạm dừng
                    </div>
                  </div>
                  <div
                    className={
                      openQuestionList
                        ? cx("practice__subnav--item", "active")
                        : cx("practice__subnav--item")
                    }
                    onClick={handleShowQuestionList}
                  >
                    <FaRegQuestionCircle
                      className={cx("practice__subnav--item-icon")}
                    />
                    <div className={cx("practice__subnav--item-label")}>
                      Danh sách câu hỏi
                    </div>
                  </div>
                  <Drawer
                    className={cx("practice__drawer")}
                    placement={"bottom"}
                    onClose={handleCloseQuestionList}
                    open={openQuestionList}
                  >
                    <div className={cx("practice__palette--body")}>
                      <div className={cx("practice__palette--progress")}>
                        <Progress
                          percent={50}
                          status="active"
                          strokeColor={"#009d9d"}
                          showInfo={false}
                        />
                        <div
                          className={cx("practice__palette--progress-title")}
                        >
                          20/40
                        </div>
                      </div>

                      <div className={cx("practice__palette--question-list")}>
                        <Row
                          style={{
                            marginTop: "0.4rem",
                          }}
                          gutter={[0, 16]}
                        >
                          <Col span={3} className={cx("question-item")}>
                            <span
                              className={cx("question-item__bground", "active")}
                            >
                              1
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              2
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              3
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              4
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              5
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              6
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              7
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              8
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              18
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              18
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              18
                            </span>
                          </Col>
                          <Col span={3} className={cx("question-item")}>
                            <span className={cx("question-item__bground")}>
                              18
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Drawer>
                  <div className={cx("practice__subnav--item")}>
                    <FaRegCheckCircle
                      className={cx("practice__subnav--item-icon")}
                    />
                    <div className={cx("practice__subnav--item-label")}>
                      Nộp bài
                    </div>
                  </div>
                </div>
              </div>

              <Modal
                className={cx("modal", "modal__pause")}
                title="Tạm dừng"
                open={isOpenModelPause}
                onOk={handlePauseOk}
                onCancel={handleCancel}
                okText={"Đồng ý"}
                cancelText={"Hủy"}
              >
                <p>Bạn có muốn tạm dừng không?</p>
              </Modal>

              <Modal
                className={cx("modal", "modal__submit")}
                title="Nộp bài"
                open={isOpenModelSubmit}
                onOk={handleSubmitOk}
                onCancel={handleCancel}
                okText={"Nộp bài"}
                cancelText={"Hủy"}
              >
                <p>
                  Bạn vẫn còn câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp
                  bài làm của mình không?
                </p>
              </Modal>

              <Modal
                className={cx("modal", "modal__feedback")}
                title="BẠN ĐANG GẶP VẤN ĐỀ GÌ?"
                open={isOpenModelFeedback}
                onOk={handleFeedbackOk}
                onCancel={handleCancel}
                footer={
                  <Button className={cx("btn__feedback")}>Gửi phản hồi</Button>
                }
              >
                <Row gutter={[16, 16]} className={cx("modal__feedback--list")}>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span className={cx("selected")}>Câu hỏi sai</span>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span>Câu trả lời chưa chính xác</span>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span>Nội dung không phù hợp</span>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span>Không thể sử dụng</span>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span>Theo dõi tiến độ kém</span>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    className={cx("modal__feedback--item")}
                  >
                    <span>Giao diện kém</span>
                  </Col>
                </Row>

                <TextArea
                  rows={4}
                  placeholder="Nhập vấn đề bạn đang mắc phải..."
                />
                <div className={cx("modal__feedback--note")}>
                  Phản hồi của bạn sẽ được ghi nhận!
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticePages;
