import { Breadcrumb, Col, Row } from "antd";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import { courseState } from "../../redux/slices/courseSlice";
import styles from "./exam.module.scss";
import { FaChevronDown, FaRegClock, FaRegQuestionCircle } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { useState } from "react";

const cx = classNames.bind(styles);

const ExamPages = () => {
  const dispatch = useAppDispatch();
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;
  const categoryReducer = useAppSelector(categoryState);
  const { categoryInfo } = categoryReducer;
  const [isOpen, setIsOpen] = useState(true);

  const handleShowExam = () => {
    setIsOpen(!isOpen);
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
                      to={`/${categoryInfo?.slug}`}
                      className={cx("exam__breadcumb--link")}
                    >
                      {categoryInfo?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={"/introduce"}
                      className={cx("exam__breadcumb--link", "active")}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    <NavLink
                      to={"/introduce"}
                      className={cx("exam__breadcumb--link", "active")}
                    >
                      exam
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
                <div className={cx("exam__panel")}>
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
                                <span>Làm ngay</span>
                                <BiChevronRight
                                  className={cx("exam__panel--icon")}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
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
                                <span>Làm ngay</span>
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
                </div>
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
