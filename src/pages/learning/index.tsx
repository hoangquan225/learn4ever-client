import { unwrapResult } from "@reduxjs/toolkit";
import { Layout, notification, Progress, Radio, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaHeart,
  FaPlayCircle,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import {
  IoChevronBackOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiLoadTopicById } from "../../api/topic";
import logo from "../../assets/img/learn4ever-icon.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  courseState,
  requestLoadCourseBySlug,
} from "../../redux/slices/courseSlice";
import {
  QuestionState,
  requestLoadQuestionsByIdTopic,
} from "../../redux/slices/questionSlice";
import {
  requestLoadTopicByCourse,
  requestLoadTotalLearnedTopic,
  topicState,
} from "../../redux/slices/topicSlice";
import {
  authState,
  requestUpdateStudiedForUser,
} from "../../redux/slices/userSlice";
import TTCSconfig from "../../submodule/common/config";
import { Topic } from "../../submodule/models/topic";
import { answers } from "../../utils/contants";
import styles from "./learning.module.scss";

const cx = classNames.bind(styles);

const LearningPages = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;
  const topicStates = useAppSelector(topicState);
  const topics = topicStates.topics;
  const topicTotal = topicStates.total;
  const topicTotalLearned = topicStates.totalLearned;
  const loading = topicStates.loading;
  const authStates = useAppSelector(authState);
  const userInfo = authStates.userInfo;
  const questionStates = useAppSelector(QuestionState);
  const questions = questionStates.questions;

  const [indexOpenTopic, setIndexOpenTopic] = useState<number[]>([]);
  const [dataTopicActive, setDataTopicActive] = useState<Topic>();
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);
  const [indexTopic, setIndexTopic] = useState<any>();
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (params.id) {
      loadTopicByParam(params.id);
    }
    loadCourse(params.slugChild || "");

    // if (topics.length) {
    //   handleChangeTopic(topics[0]?.topicChild[0]);
    // }
  }, [params.slugChild, params.id]);

  useEffect(() => {
    if (course?.id && userInfo?._id) {
      loadTotalLearnedTopic(course?.id, userInfo?._id);
    }
  }, [course?.id, userInfo?._id, userInfo]);

  useEffect(() => {
    if (
      dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_PRATICE &&
      dataTopicActive?.id
    ) {
      loadQuestionsByIdTopic(dataTopicActive?.id || "");
    }
  }, [dataTopicActive?.id]);

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

  const loadTopicByParam = (param: string) => {
    const arg = param.split("-");
    if (Number(arg[1]) === TTCSconfig.TYPE_LESSON) {
      loadTopicByCourse(arg[0], Number(arg[1]));
    } else {
      navigate(-1);
    }
  };

  const loadTopicByCourse = async (
    idCourse: string,
    type: number,
    parentId?: string
  ) => {
    try {
      const result = await dispatch(
        requestLoadTopicByCourse({
          idCourse,
          type,
          parentId,
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

  const loadTotalLearnedTopic = async (idCourse: string, idUser: string) => {
    try {
      const result = await dispatch(
        requestLoadTotalLearnedTopic({ idCourse, idUser })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
  };

  const loadQuestionsByIdTopic = async (idTopic: string) => {
    try {
      const result = await dispatch(
        requestLoadQuestionsByIdTopic({
          idTopic,
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

  const handleShowSider = () => {
    setIsShowSider(!isShowSider);
  };

  const handleChangeTopic = async (id: string) => {
    try {
      const res = await apiLoadTopicById({ id });
      setDataTopicActive(new Topic(res.data));
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
  };

  const handleUpdateLearned = async (
    idTopic: string,
    idUser: string,
    timeStudy: number
  ) => {
    try {
      if (!userInfo?.progess?.find((o) => o.idTopic === idTopic)) {
        const result = await dispatch(
          requestUpdateStudiedForUser({
            idTopic,
            idUser,
            status: TTCSconfig.STATUS_LEARNED,
            timeStudy,
          })
        );
        unwrapResult(result);
      }
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
  };

  const handlSaveSelected = (idQuestion: string, idAnswer: string) => {
    if (selectedQuestions.find((o) => o.idQuestion === idQuestion)) {
      setSelectedQuestions([
        ...selectedQuestions.filter((c) => c.idQuestion !== idQuestion),
        {
          idQuestion,
          idAnswer,
        },
      ]);
    } else {
      setSelectedQuestions((o) => [
        ...o,
        {
          idQuestion,
          idAnswer,
        },
      ]);
    }
  };

  const [currentTimeVideo, setCurrentTimeVideo] = useState(0);

  const videoPlayerRef = (e: any) => {
    // if (e !== null) {
    //   console.log({ e });
    //   setCurrentTimeVideo(e.currentTime);
    // }
  };

  const handleTimeUpdateVideo = (e: any) => {
    // if (e !== null) {
    //   e.currentTime = currentTimeVideo;
    //   console.log(currentTimeVideo);
    // }
  };

  return (
    <>
      <div className={cx("learning")}>
        {/* HEADER */}
        <header className={cx("learning__header")}>
          <div className={cx("learning__header--wrapper")}>
            <div
              className={cx("learning__header--back")}
              onClick={() => navigate(-1)}
            >
              <IoChevronBackOutline className={cx("learning__header--icon")} />
            </div>

            <Link className={cx("learning__header--logo")} to={"/"}>
              <img
                src={logo}
                alt="learn4ever_logo"
                className={cx("learning__header--logo-img")}
              />
            </Link>

            <div className={cx("learning__header--title")}>
              {course?.courseName}
            </div>

            {!loading && (
              <div className={cx("learning__header--progress")}>
                <Progress
                  type="circle"
                  className={cx("learning__header--progress-pie")}
                  width={36}
                  strokeColor={"#ffa800"}
                  percent={Math.round((topicTotalLearned / topicTotal) * 100)}
                  format={(successPercent) => `${successPercent}%`}
                />
                <div className={cx("learning__header--progress-msg")}>
                  <strong>
                    <span className={cx("learning__header--progress-num")}>
                      {topicTotalLearned}
                    </span>
                    /
                    <span className={cx("learning__header--progress-num")}>
                      {topicTotal}
                    </span>
                  </strong>
                  <p>&nbsp;bài học</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* TRACK & CONTENT*/}
        <Layout className={cx("learning__track--layout")}>
          <Sider
            breakpoint="md"
            collapsedWidth="0"
            className={
              isShowSider
                ? cx("learning__track--sider")
                : cx("learning__track--sider", "hide-sider")
            }
          >
            <div className={cx("learning__track--playlist")}>
              <div className={cx("learning__track--header")}>
                <h2 className={cx("learning__track--heading")}>
                  Nội dung khóa học
                </h2>
                <button
                  className={cx("learning__track--close")}
                  onClick={handleShowSider}
                >
                  <FaTimes className={cx("close-icon")} />
                </button>
              </div>

              <div className={cx("learning__track--body")}>
                {topics?.length > 0 &&
                  topics?.map((topic, index) => {
                    return (
                      <Fragment key={index}>
                        {indexOpenTopic.find((o) => o === index + 1) ? (
                          <div
                            className={cx("learning__track--item")}
                            onClick={() => {
                              const indexPrev = indexOpenTopic.filter(
                                (o) => o !== index + 1
                              );
                              setIndexOpenTopic(indexPrev);
                            }}
                          >
                            <div className={cx("learning__track--item-title")}>
                              {topic?.name}
                            </div>
                            <span className={cx("learning__track--item-desc")}>
                              {
                                topic.topicChildData.filter((o1) =>
                                  userInfo?.progess?.some(
                                    (o2) =>
                                      o2.idTopic === o1.id &&
                                      o1.status === TTCSconfig.STATUS_PUBLIC
                                  )
                                ).length
                              }
                              /
                              {
                                topic?.topicChildData.filter(
                                  (o) => o.status === TTCSconfig.STATUS_PUBLIC
                                ).length
                              }
                              &nbsp;|&nbsp;
                              {moment(
                                topic?.topicChildData.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + Number(currentValue.timeExam),
                                  0
                                ) * 1000
                              ).format("mm:ss")}
                            </span>
                            <span className={cx("learning__track--item-icon")}>
                              <IoChevronUpOutline
                                className={cx("track-icon")}
                              />
                            </span>
                          </div>
                        ) : (
                          <div
                            className={cx("learning__track--item")}
                            onClick={() => {
                              setIndexOpenTopic([...indexOpenTopic, index + 1]);
                            }}
                          >
                            <div className={cx("learning__track--item-title")}>
                              {topic?.name}
                            </div>
                            <span className={cx("learning__track--item-desc")}>
                              {
                                topic.topicChildData.filter((o1) =>
                                  userInfo?.progess?.some(
                                    (o2) =>
                                      o2.idTopic === o1.id &&
                                      o1.status === TTCSconfig.STATUS_PUBLIC
                                  )
                                ).length
                              }
                              /
                              {
                                topic?.topicChildData.filter(
                                  (o) => o.status === TTCSconfig.STATUS_PUBLIC
                                ).length
                              }
                              &nbsp;|&nbsp;
                              {moment(
                                topic?.topicChildData.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + Number(currentValue.timeExam),
                                  0
                                ) * 1000
                              ).format("mm:ss")}
                            </span>
                            <span className={cx("learning__track--item-icon")}>
                              <IoChevronDownOutline
                                className={cx("track-icon")}
                              />
                            </span>
                          </div>
                        )}

                        {indexOpenTopic.find((o) => o === index + 1) &&
                          topic?.topicChildData.length > 0 &&
                          [...topic?.topicChildData]?.map(
                            (topicChild, indexChild) => {
                              return (
                                topicChild.status ===
                                  TTCSconfig.STATUS_PUBLIC && (
                                  <div
                                    className={cx("learning__track--steps")}
                                    key={indexChild}
                                  >
                                    <div
                                      className={
                                        dataTopicActive?.id === topicChild.id
                                          ? cx(
                                              "learning__track--steps-item",
                                              "active"
                                            )
                                          : cx("learning__track--steps-item")
                                      }
                                      onClick={() => {
                                        setIndexTopic(topic.id);
                                        handleUpdateLearned(
                                          topicChild.id || "",
                                          userInfo?._id || "",
                                          0
                                        );
                                        handleChangeTopic(topicChild.id || "");
                                      }}
                                    >
                                      <div
                                        className={cx(
                                          "learning__track--steps-info"
                                        )}
                                      >
                                        <h3
                                          className={cx(
                                            "learning__track--steps-title"
                                          )}
                                        >
                                          {topicChild?.name}
                                        </h3>
                                        <p
                                          className={cx(
                                            "learning__track--steps-desc"
                                          )}
                                        >
                                          {topicChild?.topicType ===
                                          TTCSconfig.TYPE_TOPIC_VIDEO ? (
                                            <FaPlayCircle
                                              className={cx("desc-icon")}
                                            />
                                          ) : topicChild?.topicType ===
                                            TTCSconfig.TYPE_TOPIC_DOCUMENT ? (
                                            <FaFileAlt
                                              className={cx("desc-icon")}
                                            />
                                          ) : topicChild?.topicType ===
                                            TTCSconfig.TYPE_TOPIC_PRATICE ? (
                                            <FaQuestionCircle
                                              className={cx("desc-icon")}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                          <span
                                            className={cx(
                                              "learning__track--steps-time"
                                            )}
                                          >
                                            {moment(
                                              (topicChild?.timeExam || 0) * 1000
                                            ).format("mm:ss")}
                                          </span>
                                        </p>
                                      </div>
                                      <div
                                        className={cx(
                                          "learning__track--steps-status"
                                        )}
                                      >
                                        {userInfo?.progess?.find(
                                          (c) => c.idTopic === topicChild.id
                                        ) && (
                                          <FaCheckCircle
                                            className={cx("status-icon")}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              );
                            }
                          )}
                      </Fragment>
                    );
                  })}
              </div>
            </div>
          </Sider>
          <div
            className={
              isShowSider ? cx("overlay", "hide-sider") : cx("overlay")
            }
            onClick={handleShowSider}
          ></div>
          <Content
            className={
              isShowSider
                ? cx("learning__track--content")
                : cx("learning__track--content", "hide-sider")
            }
          >
            <div
              className={
                isShowSider
                  ? cx("content__video")
                  : cx("content__video", "hide-sider")
              }
            >
              {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_VIDEO ? (
                <div className={cx("content__video--center")}>
                  <div className={cx("content__video--player")}>
                    <video
                      controls
                      autoPlay={false}
                      className={cx("content__video--embed")}
                      src={dataTopicActive?.video || ""}
                      title="video player"
                      ref={videoPlayerRef}
                      onTimeUpdate={handleTimeUpdateVideo}
                    ></video>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className={cx("content__desc")}>
              <div className={cx("content__desc--title")}>
                <h1 className={cx("content__desc--heading")}>
                  {dataTopicActive?.name}
                </h1>
                <p className={cx("content__desc--updated")}>
                  Cập nhật ngày {dayjs(dataTopicActive?.updateDate).date()}{" "}
                  tháng {dayjs(dataTopicActive?.updateDate).month() + 1} năm{" "}
                  {dayjs(dataTopicActive?.updateDate).year()}
                </p>
              </div>

              <div
                className={cx("content__desc--text")}
                dangerouslySetInnerHTML={{
                  __html: dataTopicActive?.des ?? "",
                }}
              ></div>

              {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_PRATICE ? (
                <div>
                  {questions.length > 0 &&
                    questions?.map((question, index) => {
                      return (
                        <Row
                          id={question.id}
                          className={cx("content__practice")}
                          key={question.id}
                        >
                          <div className={cx("game__view")}>
                            <div className={cx("game__view--question")}>
                              <div className={cx("game__view--question-index")}>
                                <span>{index + 1}.</span>
                              </div>
                              <div
                                className={cx("game__view--question-text")}
                                dangerouslySetInnerHTML={{
                                  __html: question.question ?? "",
                                }}
                              ></div>
                            </div>

                            <div className={cx("game__view--quiz-choices")}>
                              <div className={cx("quiz-choices__item")}>
                                <Radio.Group style={{ width: "100%" }}>
                                  <Space
                                    direction="vertical"
                                    style={{ width: "100%" }}
                                  >
                                    {question.answer?.map((item, i) => {
                                      return (
                                        <Radio
                                          className={
                                            selectedQuestions.find(
                                              (o) =>
                                                o.idQuestion === question.id
                                            )
                                              ? item?.isResult
                                                ? cx(
                                                    "quiz-choices__item--radio",
                                                    "correct"
                                                  )
                                                : selectedQuestions.find(
                                                    (o) =>
                                                      o.idAnswer.toString() ===
                                                      item?._id?.toString()
                                                  ) &&
                                                  cx(
                                                    "quiz-choices__item--radio",
                                                    "inCorrect"
                                                  )
                                              : cx("quiz-choices__item--radio")
                                          }
                                          value={item}
                                          key={i}
                                          onClick={(e) => {
                                            handlSaveSelected(
                                              question?.id || "",
                                              item?._id || ""
                                            );
                                          }}
                                          disabled={
                                            selectedQuestions.find(
                                              (o) =>
                                                o.idQuestion === question.id
                                            )
                                              ? true
                                              : false
                                          }
                                        >
                                          <span
                                            className={cx(
                                              "quiz-choices__item--answer"
                                            )}
                                          >
                                            {answers[item.index]}.&nbsp;
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: item.text ?? "",
                                              }}
                                            ></span>
                                          </span>
                                        </Radio>
                                      );
                                    })}

                                    {selectedQuestions.find(
                                      (o) => o.idQuestion === question.id
                                    ) && (
                                      <div className={cx("quiz__explain")}>
                                        <p>Giải thích</p>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: question.hint ?? "",
                                          }}
                                        ></div>
                                      </div>
                                    )}
                                  </Space>
                                </Radio.Group>
                              </div>
                            </div>
                          </div>
                        </Row>
                      );
                    })}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className={cx("content__powered")}>
              Made with <FaHeart className={cx("content__powered--icon")} />
              <span className={cx("content__powered--dot")}>·</span>
              Powered by Nhom24_TTCS
            </div>

            <div className={cx("content__space")}></div>
          </Content>
        </Layout>

        {/* FOOTER */}
        <div className={cx("learning__footer")}>
          <div className={cx("learning__footer--wrapper")}>
            <button className={cx("learning__footer--btn-prev")}>
              <FaChevronLeft className={cx("learning__footer--btn-icon")} />
              <span>BÀI TRƯỚC</span>
            </button>

            <button className={cx("learning__footer--btn-next")}>
              <span>BÀI TIẾP</span>
              <FaChevronRight className={cx("learning__footer--btn-icon")} />
            </button>

            <div
              className={
                isShowSider
                  ? cx("learning__footer--toggle")
                  : cx("learning__footer--toggle", "hide-sider")
              }
            >
              <h3 className={cx("learning__footer--title")}>
                {topics?.map(
                  (topic, i) =>
                    topic.id === indexTopic && <div key={i}>{topic.name}</div>
                )}
              </h3>
              <button
                className={cx("learning__footer--btn-toggle")}
                onClick={handleShowSider}
              >
                {isShowSider ? (
                  <FaArrowRight className={cx("toggle-icon")} />
                ) : (
                  <FaBars className={cx("toggle-icon")} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningPages;
