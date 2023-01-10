import { Layout, Progress } from "antd";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames/bind";
import { useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaPlayCircle,
  FaTimes,
} from "react-icons/fa";
import { IoChevronBackOutline, IoChevronDownOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/learn4ever-icon.png";
import styles from "./learning.module.scss";

const cx = classNames.bind(styles);

const LearningPages = () => {
  const [isShowSider, setIsShowSider] = useState(false);
  const navigate = useNavigate();

  const handleShowSider = () => {
    setIsShowSider(!isShowSider);
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

            <div className={cx("learning__header--title")}>Title</div>

            <div className={cx("learning__header--progress")}>
              <Progress
                type="circle"
                className={cx("learning__header--progress-pie")}
                width={36}
                strokeColor={"#ffa800"}
                percent={80}
                format={(successPercent) => `${successPercent}%`}
              />
              <div className={cx("learning__header--progress-msg")}>
                <strong>
                  <span className={cx("learning__header--progress-num")}>
                    8
                  </span>
                  /
                  <span className={cx("learning__header--progress-num")}>
                    10&nbsp;
                  </span>
                </strong>
                <p>bài học</p>
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
                <div className={cx("learning__track--item")}>
                  <div className={cx("learning__track--item-title")}>
                    I. Mệnh đề toán học và tập hợp
                  </div>
                  <span className={cx("learning__track--item-desc")}>
                    8/10 | 24:30
                  </span>
                  <span className={cx("learning__track--item-icon")}>
                    <IoChevronDownOutline className={cx("track-icon")} />
                  </span>
                </div>

                <div className={cx("learning__track--steps")}>
                  <div className={cx("learning__track--steps-item", "active")}>
                    <div className={cx("learning__track--steps-info")}>
                      <h3 className={cx("learning__track--steps-title")}>
                        1. Mệnh đề
                      </h3>
                      <p className={cx("learning__track--steps-desc")}>
                        <FaPlayCircle className={cx("desc-icon")} />
                        <span className={cx("learning__track--steps-time")}>
                          01:35
                        </span>
                      </p>
                    </div>
                    <div className={cx("learning__track--steps-status")}>
                      <FaCheckCircle className={cx("status-icon")} />
                    </div>
                  </div>

                  <div className={cx("learning__track--steps-item")}>
                    <div className={cx("learning__track--steps-info")}>
                      <h3 className={cx("learning__track--steps-title")}>
                        2. Tập hợp
                      </h3>
                      <p className={cx("learning__track--steps-desc")}>
                        <FaPlayCircle className={cx("desc-icon")} />
                        <span className={cx("learning__track--steps-time")}>
                          02:35
                        </span>
                      </p>
                    </div>
                    <div className={cx("learning__track--steps-status")}>
                      <FaCheckCircle className={cx("status-icon")} />
                    </div>
                  </div>

                  <div className={cx("learning__track--steps-item")}>
                    <div className={cx("learning__track--steps-info")}>
                      <h3 className={cx("learning__track--steps-title")}>
                        3. Xác suất
                      </h3>
                      <p className={cx("learning__track--steps-desc")}>
                        <FaPlayCircle className={cx("desc-icon")} />
                        <span className={cx("learning__track--steps-time")}>
                          03:30
                        </span>
                      </p>
                    </div>
                    <div className={cx("learning__track--steps-status")}>
                      <FaCheckCircle className={cx("status-icon")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Sider>
          <div
            className={
              isShowSider ? cx("overlay", "hide-sider") : cx("overlay")
            }
            onClick={handleShowSider}
          ></div>
          <div
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
              <div className={cx("content__video--center")}>
                <div className={cx("content__video--player")}>
                  <iframe
                    className={cx("content__video--embed")}
                    src="https://www.youtube.com/embed/BBJa32lCaaY"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div className={cx("content__desc")}>
              <div className={cx("content__desc--title")}>
                <h1 className={cx("content__desc--heading")}>Title</h1>
                <p className={cx("content__desc--updated")}>
                  Cập nhật tháng 12 năm 2023
                </p>
              </div>

              <div className={cx("content__desc--text")}>
                Noi dung bai hoc se o day
              </div>
            </div>

            <div className={cx("content__powered")}>
              Made with <FaHeart className={cx("content__powered--icon")} />
              <span className={cx("content__powered--dot")}>·</span>
              Powered by Nhom24_TTCS
            </div>

            <div className={cx("content__space")}></div>
          </div>
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
