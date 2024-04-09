import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./document.module.scss";
import { Breadcrumb, Col, Input, Menu, MenuProps, Row, Select, TabsProps, notification } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TTCSconfig from "../../submodule/common/config";
import { Link, NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { FaDownload, FaEye, FaSearch } from "react-icons/fa";


const cx = classNames.bind(styles);

const DocumentPages = () => {
  const dispatch = useAppDispatch();
  const categoryReducer = useAppSelector(categoryState);
  const { categoryInfo } = categoryReducer;
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const document = [
    {
      "items": [
        {
          "createDate": 0,
          "updateDate": 0,
          "index": 0,
          "size": 1016328,
          "_id": "63eb65f34bd73c69919dc918",
          "url": "https://storage.googleapis.com/hocthongminhs.appspot.com/undefined/2023/02/14/87937788.pdf"
        }
      ],
      "_id": "63eb52a14bd73c69919dc8aa",
      "description": "<p><strong>Tổng hợp c&aacute;c dạng b&agrave;i tập trắc nghiệm giới hạn H&agrave;m số lớp 11 (c&oacute; giải th&iacute;ch chi tiết), c&oacute; PDF tải về cho c&aacute;c bạn học sinh c&oacute; thể luyện tập v&agrave; n&acirc;ng cao điểm số nhanh ch&oacute;ng !!</strong></p>",
      "content": "<p>Học Th&ocirc;ng Minh chọn lọc v&agrave; tổng hợp c&aacute;c b&agrave;i tập hay nhất của <strong>DẠNG B&Agrave;I TẬP TRẮC NGHIỆM GIỚI HẠN CỦA H&Agrave;M SỐ</strong>. T&agrave;i liệu n&agrave;y gi&uacute;p c&aacute;c em r&egrave;n luyện khả năng nhận dạng c&aacute;ch l&agrave;m dạng to&aacute;n n&agrave;y, đồng tời luyện c&aacute;c phản xạ l&agrave;m To&aacute;n Giới hạn H&agrave;m số nhanh ch&oacute;ng v&agrave; hiệu quả. C&aacute;c em c&oacute; nhu cầu sử dụng t&agrave;i liệu h&atilde;y nhanh ch&oacute;ng ấn n&uacute;t<strong> Tải về</strong> để sử dụng bản PDF ho&agrave;n to&agrave;n miễn ph&iacute; nh&eacute;!</p>",
      "title": "Các dạng bài tập trắc nghiệm giới hạn Hàm số lớp 11 (có giải thích chi tiết)",
      "slug": "cac-dang-bai-tap-trac-nghiem-gioi-han-ham-so-lop-11-co-giai-thich-chi-tiet",
      "shortDes": "Các dạng bài tập trắc nghiệm giới hạn Hàm số lớp 11 (có giải thích chi tiết), có PDF tải về ",
    },
    {
      "items": [
        {
          "createDate": 0,
          "updateDate": 0,
          "index": 0,
          "size": 1533126,
          "_id": "63eb56994bd73c69919dc8b5",
          "url": "https://storage.googleapis.com/hocthongminhs.appspot.com/prod/2023/02/14/90897435.pdf"
        }
      ],
      "_id": "63eb56994bd73c69919dc8b6",
      "description": "<p><strong>Tổng hợp v&agrave; bi&ecirc;n soạn bộ Đề cương &ocirc;n tập To&aacute;n Lớp 11 Học kỳ 2 năm học 2022-2023 gửi tới c&aacute;c em học sinh lớp 11 để c&aacute;c em c&oacute; thể &ocirc;n tập v&agrave; đạt điểm cao!!</strong></p>",
      "content": "<p>Kỳ thi cuối HK 2 đang đến gần, chắn hẳn c&aacute;c em học sinh đều đang tập trung &ocirc;n tập để gi&agrave;nh được kết quả tốt nhất. Đội ngũ bi&ecirc;n tập của Học Th&ocirc;ng Minh gửi tới c&aacute;c em bộ<strong> Đề cương &ocirc;n tập To&aacute;n Lớp 11 Học kỳ 2 năm học 2022-2023&nbsp;</strong>với những c&acirc;u hỏi trắc nghiệm hay nhất, thường xuy&ecirc;n xuất hiện trong c&aacute;c b&agrave;i thi cuối học kỳ! C&aacute;c em c&oacute; thể<strong> tải về bản PDF miễn ph&iacute; </strong>để tiến h&agrave;nh luyện tập v&agrave; l&agrave;m b&agrave;i! Ch&uacute;c c&aacute;c em &ocirc;n tập vui vẻ v&agrave; đạt kết quả tốt!</p>",
      "title": "Đề cương ôn tập Toán Lớp 11 Học kỳ 2 năm học 2022-2023 ",
      "slug": "de-cuong-on-tap-toan-lop-11-hoc-ky-2-nam-hoc-2022-2023",
      "shortDes": "Đề cương ôn tập Toán Lớp 11 Học kỳ 2 năm học 2022-2023, có PDF tải về",
    },
    {
      "items": [
        {
          "createDate": 0,
          "updateDate": 0,
          "index": 0,
          "size": 2736030,
          "_id": "63eb54da4bd73c69919dc8b1",
          "url": "https://storage.googleapis.com/hocthongminhs.appspot.com/prod/2023/02/14/41575876.pdf"
        }
      ],
      "_id": "63eb54da4bd73c69919dc8b2",
      "description": "<p>Tải ngay Bộ 10 đề thi thử cuối Học kỳ 2 m&ocirc;n To&aacute;n lớp 11 năm học 2022-2023 (c&oacute; đ&aacute;p &aacute;n) để &ocirc;n tập v&agrave; đạt điểm cao trong kỳ thi sắp tới th&ocirc;i n&agrave;o!</p>",
      "content": "<p>Tổng hợp 10 đề <strong>thi thử cuối Học kỳ 2 m&ocirc;n To&aacute;n lớp 11 năm học 2022-2023 (c&oacute; đ&aacute;p &aacute;n)</strong> đầy đủ v&agrave; chi tiết nhất! Hỗ trợ c&aacute;c em học sinh, c&aacute;c thầy c&ocirc; gi&aacute;o sưu tầm v&agrave; kiểm tra tr&igrave;nh độ, &ocirc;n tập để đạt điểm cao trong kỳ thi sắp tới. Bộ đề gồm 10 đề, thời gian l&agrave;m b&agrave;i 90 ph&uacute;t. C&oacute; hướng dẫn chi tiết để c&aacute;c em học tr&igrave;nh tham khảo xem điểm v&agrave; đ&aacute;p &aacute;n của m&igrave;nh! C&aacute;c em <strong>tải về bản PDF miễn ph&iacute;</strong> để luyện tập nh&eacute;! Ch&uacute;c c&aacute;c em đạt điểm cao trong kỳ thi sắp tới!</p>",
      "title": "Bộ 10 đề thi thử cuối Học kỳ 2 môn Toán lớp 11 năm học 2022-2023 (có đáp án)",
      "slug": "bo-10-de-thi-thu-cuoi-hoc-ky-2-mon-toan-lop-11-nam-hoc-2022-2023-co-dap-an",
      "shortDes": "Bộ 10 đề thi thử cuối Học kỳ 2 môn Toán lớp 11 năm học 2022-2023 (có đáp án), có PDF tải về",
    }
  ]

  return (
    <>
      <Header />
      <div className={cx("document")}>
        <div className={cx("wide")}>
          <div className={cx("document__container")}>
            <div className={cx("document__wrapper")}>
              <div className={cx("category__breadcrumb")}>
                <Breadcrumb separator="›">
                  <Breadcrumb.Item>
                    <NavLink
                      to={"/"}
                      className={cx("category__breadcumb--link")}
                    >
                      Trang chủ
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${categoryInfo?.slug}`}
                      className={cx("category__breadcumb--link", "active")}
                    >
                      {/* {categoryInfo?.name} */}
                      Tài Liệu
                    </NavLink>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className={cx("document__frame")}>
                <div className={cx("document__header")}>
                  <h1 className={cx("document__heading")}>Thư viện tài liệu học tập mới nhất</h1>
                </div>
                <div className={cx("document__main")}>
                  <Row style={{ width: "100%" }} gutter={16}>
                    <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                      <div className={cx("document__side-bar")}>
                        <ul>
                          <li >Môn học</li>
                          <li onClick={() => setSelectedCourse(0)} className={cx(selectedCourse === 0 ? "active" : "")}>Toán</li>
                          <li onClick={() => setSelectedCourse(1)} className={cx(selectedCourse === 1 ? "active" : "")}>Vật Lý</li>
                          <li onClick={() => setSelectedCourse(2)} className={cx(selectedCourse === 2 ? "active" : "")}>Hóa Học</li>
                          <li onClick={() => setSelectedCourse(3)} className={cx(selectedCourse === 3 ? "active" : "")}>Sinh Học</li>
                          <li onClick={() => setSelectedCourse(4)} className={cx(selectedCourse === 4 ? "active" : "")}>Địa Lý</li>
                          <li onClick={() => setSelectedCourse(5)} className={cx(selectedCourse === 5 ? "active" : "")}>Ngữ Văn</li>
                          <li onClick={() => setSelectedCourse(6)} className={cx(selectedCourse === 6 ? "active" : "")}>Tiếng Anh</li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl={19} lg={19} md={19} sm={19} xs={19}>
                      <div className={cx("document__content")}>
                        <div className={cx("document__content--header")}>
                          <div className={cx("document__content--btn")}>
                            <button onClick={() => setSelectedCategory(0)} className={cx("btn", selectedCategory === 0 ? "active" : "")}>
                              Lớp 10
                            </button>
                            <button onClick={() => setSelectedCategory(1)} className={cx("btn", selectedCategory === 1 ? "active" : "")}>
                              Lớp 11
                            </button>
                            <button onClick={() => setSelectedCategory(2)} className={cx("btn", selectedCategory === 2 ? "active" : "")}>
                              Lớp 12
                            </button>
                          </div>
                          <div className={cx("document__content--search")}>
                            <Input
                              prefix={
                                <FaSearch
                                  style={{
                                    fontSize: "1.8rem",
                                    marginRight: "0.8rem",
                                    marginLeft: "0.4rem",
                                    opacity: "0.8"
                                  }}
                                />
                              }
                              placeholder="Tìm kiếm tài liệu"
                              style={{ padding: "8px" }}
                            />
                          </div>
                        </div>
                        <Row className={cx("document__content--main")} style={{ width: "100%" }} gutter={[16, 16]}>
                          {document?.map((e, i) => {
                            return (
                              <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                                <Link to={"/tai-lieu/aaaa"} className={cx("document__link")}>
                                  <div className={cx("document__content-item")}>
                                    <div className={cx("document__content-item-header")}>
                                      {e.title}
                                    </div>
                                    <div className={cx("document-content-item-actions")}>
                                      <div>
                                        <FaDownload />
                                        <span>20</span>
                                      </div>
                                      <div>
                                        <FaEye />
                                        <span>200</span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </Col>
                            )
                          })}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DocumentPages;
