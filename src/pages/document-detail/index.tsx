import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./document-detail.module.scss";
import { Breadcrumb, Col, Row, Select, TabsProps, notification } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TTCSconfig from "../../submodule/common/config";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { NavLink } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const cx = classNames.bind(styles);

const DocumentDetailPages = () => {
  const dispatch = useAppDispatch();
  const categoryReducer = useAppSelector(categoryState);
  const { categoryInfo } = categoryReducer;

  const [numPages, setNumPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  const maxWidth = 650;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  }

  return (
    <>
      <Header />
      <div className={cx("document")}>
        <div className={cx("wide")}>
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
                    // to={`/${categoryInfo?.slug}`}
                    to={`/tai-lieu`}
                    className={cx("category__breadcumb--link")}
                  >
                    Tài liệu
                    {/* {categoryInfo?.name} */}
                  </NavLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <NavLink
                    to={`/`}
                    className={cx("category__breadcumb--link", "active")}
                  >
                    {/* {course?.courseName} */}
                    AAAAAA
                  </NavLink>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className={cx("document__container")}>
              <div className={cx("document__header")}>
                <h1 className={cx("document__heading")}>Tổng hợp 100 câu hỏi trắc nghiệm Toán 10 chuyên đề Hàm số (có đáp án)</h1>
                <div className={cx("detail-document-header-desc")}>
                  <p>
                    <strong>
                      Tải ngay bộ đề Tổng hợp 100 câu hỏi trắc nghiệm Toán 10 chuyên đề Hàm số (có đáp án) để luyện tập chuẩn bị cho kỳ thi sắp tới ngay!&nbsp;
                    </strong>
                  </p>
                </div>
              </div>
              <div className={cx("detail-document-content")} >
                <p>
                  Dưới đây là bộ đề ôn tập
                  <strong> 100 Câu trắc nghiệm bài hàm số Toán 10 có lời giải chi tiết </strong> 
                  được tổng hợp và biên soạn kỹ càng, có chọn lọc. Các em học sinh tham khảo và
                  <strong> tải về bản  </strong> 
                  để luyện tập nhé!
                </p>
              </div>

              <div className={cx("pdf__container")}>
                <div className={cx("pdf__container__document")}>
                  <Document file="https://storage.googleapis.com/hocthongminhs.appspot.com/undefined/2023/02/14/87937788.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={maxWidth}
                      />
                    ))}
                  </Document>
                </div>
              </div>

              <div className={cx("pdf__container")}>
                <div className={cx("pdf__container__document")}>
                 <iframe src="https://59462484.tiiny.site/"></iframe>
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

export default DocumentDetailPages;
