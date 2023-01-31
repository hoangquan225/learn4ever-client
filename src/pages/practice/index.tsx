import { unwrapResult } from "@reduxjs/toolkit";
import {
  Anchor,
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Modal,
  notification,
  Progress,
  Radio,
  Row,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Countdown from "antd/es/statistic/Countdown";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  FaMarker,
  FaRegCheckCircle,
  FaRegClock,
  FaRegPauseCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { apiLoadQuestionsByTopic, apiLoadTopicById } from "../../api/topic";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  courseState,
  requestLoadCourseBySlug,
} from "../../redux/slices/courseSlice";
import {
  requestLoadTopicById,
  topicState,
} from "../../redux/slices/topicSlice";
import TTCSconfig from "../../submodule/common/config";
import { Question } from "../../submodule/models/question";
import { answers } from "../../utils/contants";
import styles from "./practice.module.scss";

const cx = classNames.bind(styles);

const PracticePages = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const topicStates = useAppSelector(topicState);
  const topic = topicStates.topicInfo;
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;
  const loading = courseReducer.loading;
  const [clockStick, setClockStick] = useState(false);
  const [openQuestionList, setOpenQuestionList] = useState(false);
  const [isOpenModelPause, setIsOpenModelPause] = useState(false);
  const [isOpenModelSubmit, setIsOpenModelSubmit] = useState(false);
  const [isOpenModelFeedback, setIsOpenModelFeedback] = useState(false);

  const [datasQuestion, setDatasQuestion] = useState<Question[]>([]);

  useEffect(() => {
    window.addEventListener("scroll", handleClockStick);

    return () => {
      window.removeEventListener("scroll", handleClockStick);
    };
  }, []);

  useEffect(() => {
    loadQuestionByTopic(params.idChild || "", 1);
    loadCourse(params.slugChild || "");
    loadTopicById(params.idChild || "");
  }, [params.idChild, params.slugChild]);

  const loadCourse = async (slugChild: string) => {
    try {
      const result = await dispatch(
        requestLoadCourseBySlug({
          slug: slugChild,
          status: TTCSconfig.STATUS_PUBLIC,
        })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
  };

  const handleClockStick = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 180
        ? setClockStick(!clockStick)
        : setClockStick(clockStick);
    }
  };

  const loadQuestionByTopic = async (idTopic: string, status: number) => {
    try {
      const res = await apiLoadQuestionsByTopic({ idTopic, status });
      setDatasQuestion(res.data.data?.map((o: any) => new Question(o)));
    } catch (error) {
      notification.error({
        message: "lỗi server, không tải được câu hỏi",
        duration: 1.5,
      });
    }
  };

  const loadTopicById = async (id: string) => {
    try {
      const result = await dispatch(requestLoadTopicById({ id }));
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "lỗi server, không tải được câu hỏi",
        duration: 1.5,
      });
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

  const onFinish = () => {
    console.log("finished!");
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
                  {!loading && (
                    <>
                      <Breadcrumb.Item>
                        <NavLink
                          to={`/${course?.category?.slug}`}
                          className={cx("detail__breadcumb--link")}
                        >
                          {course?.category?.name}
                        </NavLink>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <NavLink
                          to={`/${course?.category?.slug}/${course?.slug}`}
                          className={cx("detail__breadcumb--link")}
                        >
                          {course?.courseName}
                        </NavLink>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <NavLink
                          to={"#"}
                          className={cx("exam__breadcumb--link")}
                        >
                          Đề kiểm tra
                        </NavLink>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <NavLink
                          to={"/gioi-thieu"}
                          className={cx("practice__breadcumb--link", "active")}
                        >
                          practice
                        </NavLink>
                      </Breadcrumb.Item>
                    </>
                  )}
                </Breadcrumb>
              </div>

              <h1 className={cx("practice__heading")}>{topic?.name}</h1>

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
                      <Countdown
                        value={Date.now() + Number(topic?.timeExam) * 1000 * 60}
                        onFinish={onFinish}
                      />
                    </span>
                  </Row>

                  <div>
                    {datasQuestion.length > 0 &&
                      datasQuestion?.map((qs, i) => {
                        const listAnswer = [...qs.result, ...qs.answer].sort(
                          (a, b) => a.index - b.index
                        );

                        return (
                          <Row
                            id={qs.id}
                            className={cx("practice__practice")}
                            key={qs.id}
                          >
                            <div className={cx("practice__practice--item")}>
                              <div className={cx("feedback-icon--wrapper")}>
                                <FaMarker
                                  className={cx("feedback-icon")}
                                  onClick={handleOpenModelFeedback}
                                />
                              </div>
                              <div className={cx("game__view")}>
                                <div className={cx("game__view--question")}>
                                  <div
                                    className={cx("game__view--question-index")}
                                  >
                                    <span>{i + 1}.</span>
                                  </div>
                                  <div
                                    className={cx("game__view--question-text")}
                                  >
                                    {qs.question}
                                  </div>
                                </div>

                                <div className={cx("game__view--quiz-choices")}>
                                  <div className={cx("quiz-choices__item")}>
                                    <Radio.Group name="radiogroup">
                                      <Space direction="vertical">
                                        {listAnswer?.map((item, i) => (
                                          <Radio value={item.index} key={i}>
                                            <div
                                              className={cx(
                                                "quiz-choices__item--answer"
                                              )}
                                            >
                                              {answers[item.index]}. {item.text}
                                            </div>
                                          </Radio>
                                        ))}
                                      </Space>
                                    </Radio.Group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Row>
                        );
                      })}
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
                            {datasQuestion?.map((o, i) => (
                              <Col
                                span={3}
                                className={cx("question-item")}
                                key={i}
                              >
                                <a href={`#${o.id}`}>
                                  <span
                                    className={cx("question-item__bground")}
                                  >
                                    {i + 1}
                                  </span>
                                </a>
                              </Col>
                            ))}
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
                  <div
                    className={cx("practice__subnav--item")}
                    onClick={handleOpenModelPause}
                  >
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
                          {datasQuestion?.map((o, i) => (
                            <Col
                              span={3}
                              className={cx("question-item")}
                              key={i}
                            >
                              <a href={`#${o.id}`}>
                                <span className={cx("question-item__bground")}>
                                  {i + 1}
                                </span>
                              </a>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </Drawer>
                  <div
                    className={cx("practice__subnav--item")}
                    onClick={handleOpenModelSubmit}
                  >
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
