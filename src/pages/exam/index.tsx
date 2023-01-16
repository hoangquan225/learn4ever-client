import { Breadcrumb, Col, notification, Row } from "antd";
import classNames from "classnames/bind";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import {
  courseState,
  requestLoadCourseBySlug,
} from "../../redux/slices/courseSlice";
import styles from "./exam.module.scss";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import TTCSconfig from "../../submodule/common/config";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  requestLoadTopicByCourse,
  topicState,
} from "../../redux/slices/topicSlice";

const cx = classNames.bind(styles);

const ExamPages = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;
  const topicStates = useAppSelector(topicState);
  const topics = topicStates.topics;
  const [indexOpenTopic, setIndexOpenTopic] = useState<number[]>([]);

  useEffect(() => {
    if (params.id) {
      const arg = params.id.split("-");
      loadTopicByCourse(arg[0], Number(arg[1]));
    }
    loadCourse(params.slugChild || "");
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

  return (
    <div>
      <Header />
      <div className={cx("exam")}>
        <div className={cx("wide")}>
          <div className={cx("exam__container")}>
            <div className={cx("exam__wrapper")}>
              <div className={cx("exam__breadcrumb")}>
                <Breadcrumb separator="›">
                  <Breadcrumb.Item>
                    <NavLink to={"/"} className={cx("exam__breadcumb--link")}>
                      Trang chủ
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}`}
                      className={cx("exam__breadcumb--link")}
                    >
                      {course?.category?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}`}
                      className={cx("exam__breadcumb--link", "active")}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    <NavLink
                      to={"#"}
                      className={cx("exam__breadcumb--link", "active")}
                    >
                      Đề kiểm tra
                    </NavLink>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div>
                <h1 className={cx("exam__title")}>
                  Luyện đề trắc nghiệm {course?.courseName}
                </h1>
              </div>

              <div className={cx("exam__view")}>
                {/* <div className={cx("exam__panel")}>
                  <div className={cx("exam__panel--item")}>
                    <div
                      className={cx("exam__panel--title")}
                      onClick={handleShowExam}
                    >
                      <FaChevronDown className={cx("panel__icon")} />
                      <h3 className={cx("panel__text")}>
                        Đề kiểm tra giữa học kì 1 môn Vật Lý 12
                      </h3>
                    </div>

                    <Row
                      gutter={[12, 12]}
                      className={
                        isOpen ? cx("exam__appear") : cx("exam__appear", "hide")
                      }
                    >
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className={cx("exam__panel--content")}>
                          <span>
                            Đề kiểm tra giữa học kì 1 môn Vật Lý 12 - Đề số 1
                          </span>
                          <div className={cx("exam__panel--action")}>
                            <div className={cx("panel--action-item")}>
                              <div>
                                <FaRegQuestionCircle />
                                <span>40 câu</span>
                              </div>
                              <div>
                                <FaRegClock />
                                <span>50 phút</span>
                              </div>
                            </div>
                            <div className={cx("exam__join")}>
                              <button className={cx("exam__panel--btn")}>
                                <span>Làm bài</span>
                                <BiChevronRight
                                  className={cx("exam__panel--icon")}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div> */}

                {topics.length ? (
                  topics?.map((data, i) => {
                    const dataChild = data.topicChildData;
                    return (
                      <div className={cx("exam__panel")} key={data.id}>
                        <div className={cx("exam__panel--item")}>
                          {indexOpenTopic.find((o) => o === i + 1) ? (
                            <div
                              className={cx("exam__panel--title")}
                              onClick={() => {
                                const indexPrev = indexOpenTopic.filter(
                                  (o) => o !== i + 1
                                );
                                console.log(indexPrev);
                                setIndexOpenTopic(indexPrev);
                              }}
                            >
                              <FaChevronUp className={cx("panel__icon")} />
                              <h3 className={cx("panel__text")}>
                                {data?.name}
                              </h3>
                            </div>
                          ) : (
                            <div
                              className={cx("exam__panel--title")}
                              onClick={() => {
                                setIndexOpenTopic([...indexOpenTopic, i + 1]);
                              }}
                            >
                              <FaChevronDown className={cx("panel__icon")} />
                              <h3 className={cx("panel__text")}>
                                {data?.name}
                              </h3>
                            </div>
                          )}

                          <Row
                            gutter={[12, 12]}
                            className={
                              indexOpenTopic.find((o) => o === i + 1)
                                ? cx("exam__appear")
                                : cx("exam__appear", "hide")
                            }
                          >
                            {dataChild?.map((dataChild, iChild) => (
                              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <div className={cx("exam__panel--content")}>
                                  <span>{dataChild.name}</span>
                                  <div className={cx("exam__panel--action")}>
                                    <div className={cx("panel--action-item")}>
                                      <div>
                                        <FaRegQuestionCircle />
                                        <span>40 câu</span>
                                      </div>
                                      <div>
                                        <FaRegClock />
                                        <span>50 phút</span>
                                      </div>
                                    </div>
                                    <div className={cx("exam__join")}>
                                      <button
                                        className={cx("exam__panel--btn")}
                                      >
                                        <span>Làm bài</span>
                                        <BiChevronRight
                                          className={cx("exam__panel--icon")}
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            ))}

                            {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                              <div className={cx("exam__panel--content")}>
                                <span>topic con</span>
                                <div className={cx("exam__panel--action")}>
                                  <div className={cx("panel--action-item")}>
                                    <div>
                                      <FaRegQuestionCircle />
                                      <span>40 câu</span>
                                    </div>
                                    <div>
                                      <FaRegClock />
                                      <span>50 phút</span>
                                    </div>
                                  </div>
                                  <div className={cx("exam__join")}>
                                    <button className={cx("exam__panel--btn")}>
                                      <span>Làm bài</span>
                                      <BiChevronRight
                                        className={cx("exam__panel--icon")}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col> */}
                          </Row>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamPages;
