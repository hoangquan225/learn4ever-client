import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./courseDetail.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumb, Col, Row } from "antd";
import {
  FaBatteryFull,
  FaCheck,
  FaClock,
  FaFilm,
  FaLightbulb,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { categoryState } from "../../redux/slices/categorySlice";
import { useAppSelector } from "../../redux/hook";

const cx = classNames.bind(styles);

const CourseDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const categoryReducer = useAppSelector(categoryState);
  // const

  useEffect(() => {
    console.log(params || "");
    // loadCategory(params.slugChild || "");
  }, [params.slugChild]);

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
                      to={"/introduce"}
                      className={cx("detail__breadcumb--link")}
                    >
                      Lop
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={"/introduce"}
                      className={cx("detail__breadcumb--link", "active")}
                    >
                      Mon
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
                  <h1 className={cx("detail__name")}>Ten se o day</h1>

                  <div className={cx("detail__des")}>mo ta se o day</div>

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

                  <div className={cx("detail__group--btn")}>
                    <Row>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <NavLink
                          to={"/learning"}
                          className={cx("detail__btn--link")}
                        >
                          <button className={cx("detail__button", "btn1")}>
                            Chương trình học
                          </button>
                        </NavLink>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <NavLink
                          to={"/exam"}
                          className={cx("detail__btn--link")}
                        >
                          <button className={cx("detail__button", "btn2")}>
                            Đề kiểm tra
                          </button>
                        </NavLink>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                  <div className={cx("detail__badge")}>
                    <div className={cx("detail__image")}>
                      <img
                        src="https://i.picsum.photos/id/667/300/200.jpg?hmac=zePsf4ntoIYuhdLR2XAXfkwSgy0pxWfIJY1mvwT3Trs"
                        alt="course-avatar"
                        className={cx("detail__avatar")}
                      />
                    </div>
                    <h5 className={cx("detail__price")}>Miễn phí</h5>
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
