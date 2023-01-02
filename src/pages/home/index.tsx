import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Header from "../../components/header";
import Banner1 from "../../components/banner1";
import Banner2 from "../../components/banner2";
import Panel from "../../components/panel";
import Feedback from "../../components/feedback";
import Footer from "../../components/footer";
import { Col, notification, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  categoryState,
  requestLoadCategorys,
} from "../../redux/slices/categorySlice";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const cx = classNames.bind(styles);

const HomePages = () => {
  const [numberOfItemsShow, setNumberOfItemsShow] = useState(4);

  const categoryStates = useAppSelector(categoryState);
  const categorys = categoryStates.categorys;

  const dispatch = useAppDispatch();

  const loadCategorys = async () => {
    try {
      const actionResult = await dispatch(
        requestLoadCategorys({
          status: 1,
        })
      );
      const res = unwrapResult(actionResult);
    } catch (error) {
      notification.error({
        message: "không tải được danh sach danh mục",
      });
    }
  };

  useEffect(() => {
    loadCategorys();
  }, []);

  const handleShowMore = () => {
    if (numberOfItemsShow + 4 <= categorys.length) {
      setNumberOfItemsShow(numberOfItemsShow + 4);
    } else {
      setNumberOfItemsShow(categorys.length);
    }
  };

  const handleShowLess = () => {
    setNumberOfItemsShow(4);
  };

  return (
    <>
      <div className={cx("home")}>
        <Header />
        <Banner1 />

        <div className={cx("category")}>
          <div className={cx("category__container")}>
            <div className={cx("wide")}>
              <div className={cx("category__text")}>
                <h1 className={cx("category__title")}>
                  Luyện tập trắc nghiệm online tại learn4ever
                </h1>
                <span className={cx("category__summary")}>
                  Làm trắc nghiệm online các môn Toán, Lý, Hóa, Sinh, Sử, Địa,
                  GDCD, Tiếng Anh, Văn với các bài luyện tập theo chương trình
                  học và đề thi học kì, giữa kì, ... có đáp án, lời giải chi
                  tiết.
                </span>
              </div>

              <Row
                gutter={{ xs: 16, sm: 16, md: 16, lg: 16, xl: 16 }}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  margin: "0 0",
                }}
              >
                {categorys.slice(0, numberOfItemsShow).map((data) => (
                  <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Link to={data.slug} className={cx("category__link")}>
                      <div className={cx("category__item")}>
                        <div className={cx("category__img")}>
                          <img
                            className={cx("category-image")}
                            src={data.avatar ?? ""}
                            alt={data.name}
                          />
                        </div>
                        <div className={cx("category__info")}>
                          <div className={cx("categoty__name")}>
                            {data.name}
                          </div>
                          <div className={cx("category__des")}>{data.des}</div>
                          <div className={cx("category__join")}>
                            <button className={cx("category__btn")}>
                              <span>Làm ngay</span>
                              <BiChevronRight
                                className={cx("category__icon")}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
                {numberOfItemsShow === categorys.length ? (
                  <button
                    className={cx("category__less", "category__btn--option")}
                    onClick={handleShowLess}
                  >
                    Ẩn bớt
                    <div className={cx("category__less--loader")}>
                      <span />
                    </div>
                  </button>
                ) : (
                  <button
                    className={cx("category__more", "category__btn--option")}
                    onClick={handleShowMore}
                  >
                    Xem thêm
                    <div className={cx("category__more--loader")}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </button>
                )}
              </Row>
            </div>
          </div>
        </div>

        <Banner2 />
        <Panel />
        <Feedback />
        <Footer />
      </div>
    </>
  );
};

export default HomePages;
