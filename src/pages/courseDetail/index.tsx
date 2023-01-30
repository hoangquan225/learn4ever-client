import { unwrapResult } from "@reduxjs/toolkit";
import { Breadcrumb, Col, notification, Row } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import {
  FaBatteryFull,
  FaCheck,
  FaClock,
  FaFilm,
  FaLightbulb,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import {
  courseState,
  requestLoadCourseBySlug,
} from "../../redux/slices/courseSlice";
import TTCSconfig from "../../submodule/common/config";
import styles from "./courseDetail.module.scss";

const cx = classNames.bind(styles);

const CourseDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const courseReducer = useAppSelector(courseState);
  const course = courseReducer.course;

  useEffect(() => {
    loadCourse(params.slugChild || "");
  }, [params.slugChild]);

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

  return (
    <>
      <Header />

      <div className={cx("detail")}>
        <div className={cx("wide")}>
          <div className={cx("detail__container")}>
            <div className={cx("detail__wrapper")}>
              <div className={cx("detail__breadcrumb")}>
                <Breadcrumb separator="›">
                  <Breadcrumb.Item>
                    <NavLink to={"/"} className={cx("detail__breadcumb--link")}>
                      Trang chủ
                    </NavLink>
                  </Breadcrumb.Item>
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
                      className={cx("detail__breadcumb--link", "active")}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <Row
                style={{ width: "100%", margin: "0" }}
                gutter={16}
                className={cx("detail__row")}
              >
                <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                  <h1 className={cx("detail__name")}>{course?.courseName}</h1>

                  <div
                    className={cx("detail__des")}
                    dangerouslySetInnerHTML={{
                      __html: course?.des ?? "",
                    }}
                  ></div>

                  <div className={cx("detail__topic")}>
                    <h2 className={cx("detail__topic--heading")}>
                      Bạn sẽ học được gì?
                    </h2>
                    <ul className={cx("detail__topic--list")}>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Nắm chắc lý thuyết chung trong môn học
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Biết cách làm các dạng bài cơ bản
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Học được cách tư duy bài tập một cách hiệu quả
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Được chia sẻ lại kinh nghiệm qua các bài tập
                      </li>
                    </ul>
                  </div>

                  <div className={cx("detail__topic")}>
                    <h2 className={cx("detail__topic--heading")}>Yêu cầu</h2>
                    <ul className={cx("detail__topic--list")}>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Nắm chắc các kiến thức của môn học ở các lớp dưới
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Sở hữu máy tính hoặc thiết bị di động kết nối internet
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />Ý thức
                        cao, trách nhiệm cao trong việc tự học. Thực hành lại
                        sau mỗi bài học
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Khi học nếu có khúc mắc hãy hỏi/đáp tại phần bình luận
                      </li>
                      <li className={cx("detail__topic--item")}>
                        <FaCheck className={cx("detail__topic--icon")} />
                        Bạn không cần biết gì hơn nữa, khóa học sẽ chỉ cho bạn
                        những gì bạn cần biết
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                  <div className={cx("detail__badge")}>
                    <div className={cx("detail__image")}>
                      <img
                        src={course?.avatar || ""}
                        alt="course-avatar"
                        className={cx("detail__avatar")}
                      />
                    </div>
                    <h5 className={cx("detail__price")}>Miễn phí</h5>
                    <div className={cx("detail__group--btn")}>
                      <Row>
                        <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                          <NavLink
                            to={`chuong-trinh-hoc/${course?.id}-1`}
                            className={cx("detail__btn--link")}
                          >
                            <button className={cx("detail__button", "btn1")}>
                              Chương trình học
                            </button>
                          </NavLink>
                        </Col>

                        <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                          <NavLink
                            to={`de-kiem-tra/${course?.id}-2`}
                            className={cx("detail__btn--link")}
                          >
                            <button className={cx("detail__button", "btn2")}>
                              Đề kiểm tra
                            </button>
                          </NavLink>
                        </Col>
                      </Row>
                    </div>
                    <ul className={cx("detail__list")}>
                      <li className={cx("detail__item")}>
                        <FaLightbulb className={cx("detail__icon")} />
                        <span>Trình độ cơ bản</span>
                      </li>
                      <li className={cx("detail__item")}>
                        <FaFilm className={cx("detail__icon")} />
                        <span>
                          Tổng số <strong>38</strong> bài học
                        </span>
                      </li>
                      <li className={cx("detail__item")}>
                        <FaClock className={cx("detail__icon")} />
                        <span>
                          Thời lượng <strong>12 giờ 10 phút</strong>
                        </span>
                      </li>
                      <li className={cx("detail__item")}>
                        <FaBatteryFull className={cx("detail__icon")} />
                        <span>Học mọi lúc, mọi nơi</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetail;
