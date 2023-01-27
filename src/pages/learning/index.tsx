import { unwrapResult } from "@reduxjs/toolkit";
import { Layout, notification, Progress } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
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
import { apiLoadLessonByIdTopic } from "../../api/topic";
import logo from "../../assets/img/learn4ever-icon.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  courseState,
  requestLoadCourseBySlug,
} from "../../redux/slices/courseSlice";
import {
  requestLoadTopicByCourse,
  topicState,
} from "../../redux/slices/topicSlice";
import TTCSconfig from "../../submodule/common/config";
import { Lesson } from "../../submodule/models/lesson";
import styles from "./learning.module.scss";

const cx = classNames.bind(styles);

const LearningPages = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;
  const topicStates = useAppSelector(topicState);
  const topics = topicStates.topics;
  const topicsTotal = topicStates.total;
  const [indexOpenTopic, setIndexOpenTopic] = useState<number[]>([]);
  const [dataLesson, setDataLesson] = useState<Lesson>();
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);

  useEffect(() => {
    if (params.id) {
      const arg = params.id.split("-");
      loadTopicByCourse(arg[0], Number(arg[1]));
    }
    loadCourse(params.slugChild || "");

    if (topics.length) {
      handleChangeLesson(1, topics[0]?.topicChild[0]);
    }
  }, [params.slugChild, params.id]);

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

  const loadTopicByCourse = async (
    idCourse: string,
    type: number,
    parentId?: string
  ) => {
    try {
      const result = await dispatch(
        requestLoadTopicByCourse({ idCourse, type, parentId })
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

  const handleChangeLesson = async (status: number, idTopic: string) => {
    try {
      const result = await apiLoadLessonByIdTopic({ status, idTopic });
      // console.log(result.data.data);
      setDataLesson(result.data.data);
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
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

            <div className={cx("learning__header--progress")}>
              <Progress
                type="circle"
                className={cx("learning__header--progress-pie")}
                width={36}
                strokeColor={"#ffa800"}
                percent={50}
                format={(successPercent) => `${successPercent}%`}
              />
              <div className={cx("learning__header--progress-msg")}>
                <strong>
                  <span className={cx("learning__header--progress-num")}>
                    2
                  </span>
                  /
                  <span className={cx("learning__header--progress-num")}>
                    {topicsTotal}
                  </span>
                </strong>
                <p>&nbsp;bài học</p>
              </div>
            </div>
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
                              0/{topic?.topicChildData.length} | 24:30
                            </span>
                            <span className={cx("learning__track--item-icon")}>
                              <IoChevronDownOutline
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
                              0/{topic?.topicChildData.length} | 24:30
                            </span>
                            <span className={cx("learning__track--item-icon")}>
                              <IoChevronUpOutline
                                className={cx("track-icon")}
                              />
                            </span>
                          </div>
                        )}

                        {indexOpenTopic.find((o) => o === index + 1) &&
                          topic?.topicChildData[0] &&
                          topic?.topicChildData.map(
                            (topicChild, indexChild) => {
                              return (
                                <div
                                  className={cx("learning__track--steps")}
                                  key={indexChild}
                                >
                                  <div
                                    // className={cx(
                                    //   "learning__track--steps-item"
                                    //   // "active"
                                    // )}
                                    className={
                                      dataLesson?.idTopic === topicChild.id
                                        ? cx(
                                            "learning__track--steps-item",
                                            "active"
                                          )
                                        : cx("learning__track--steps-item")
                                    }
                                    onClick={() =>
                                      handleChangeLesson(
                                        topicChild.status,
                                        topicChild.id || ""
                                      )
                                    }
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
                                        {topicChild?.topicType === 4 ? (
                                          <FaPlayCircle
                                            className={cx("desc-icon")}
                                          />
                                        ) : topicChild?.topicType === 5 ? (
                                          <FaFileAlt
                                            className={cx("desc-icon")}
                                          />
                                        ) : topicChild?.topicType === 2 ? (
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
                                          01:35
                                        </span>
                                      </p>
                                    </div>
                                    <div
                                      className={cx(
                                        "learning__track--steps-status"
                                      )}
                                    >
                                      <FaCheckCircle
                                        className={cx("status-icon")}
                                      />
                                    </div>
                                  </div>
                                </div>
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
              {dataLesson?.video && (
                <div className={cx("content__video--center")}>
                  <div className={cx("content__video--player")}>
                    <iframe
                      className={cx("content__video--embed")}
                      src={dataLesson?.video}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            <div className={cx("content__desc")}>
              <div className={cx("content__desc--title")}>
                <h1 className={cx("content__desc--heading")}>title</h1>
                <p className={cx("content__desc--updated")}>
                  {/* Cập nhật ngày {dayjs(dataLesson?.updateDate).format("MM/DD/YYYY")} */}
                  Cập nhật ngày {dayjs(dataLesson?.updateDate).date()} tháng{" "}
                  {dayjs(dataLesson?.updateDate).month() + 1} năm{" "}
                  {dayjs(dataLesson?.updateDate).year()}
                </p>
              </div>

              <div className={cx("content__desc--text")}>{dataLesson?.des}</div>
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
                I. Mệnh đề toán học và tập hợp
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
