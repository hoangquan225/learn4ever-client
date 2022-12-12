import classNames from "classnames/bind";
import styles from "./banner2.module.scss";
import bannerUpImg from "../../assets/img/bannerUp.webp";
import bannerDownImg from "../../assets/img/bannerDown.webp";

const cx = classNames.bind(styles);

const Banner2 = () => {
  return (
    <>
      <div className={cx("banner")}>
        {/* <div className={cx("wide")}> */}
        <div className={cx("banner__container")}>
          <div className={cx("banner__up")}>
            <div className={cx("banner__wrapper", "banner__wrapper--up")}>
              <div className={cx("banner__content")}>
                <div className={cx("banner__title")}>
                  <h2>Luyện Tập</h2>
                  <p>Trắc Nghiệm Tiếng Anh</p>
                </div>
                <div className={cx("banner__desc")}>
                  Tất cả các thí sinh đã tốt nghiệp THPT hoặc đã hoàn thành
                  chương trình học văn hóa tương đương THPT có đủ điều kiện tham
                  gia kỳ tuyển sinh đại học năm 2022 theo quy định hiện hành của
                  Bộ Giáo dục và Đào tạo.
                </div>
                <div className={cx("banner__button")}>
                  <button className={cx("banner__button--up")}>
                    Làm bài thi THPT Tiếng Anh &nbsp; &gt;
                  </button>
                </div>
              </div>
              <div className={cx("banner__img")}>
                <img
                  src={bannerUpImg}
                  alt="join"
                  className={cx("img__banner")}
                />
              </div>
            </div>
          </div>

          <div className={cx("banner__down")}>
            <div className={cx("banner__wrapper", "banner__wrapper--down")}>
              <div className={cx("banner__content")}>
                <div className={cx("banner__title")}>
                  <h2>Tài liệu</h2>
                  <p>Thư viện tài liệu</p>
                </div>
                <div className={cx("banner__desc")}>
                  Với kho thư viện khổng lồ tổng hợp các giáo trình, đề thi, tài
                  liệu,... là nơi bạn có thể tải những bộ tài liệu chất lượng
                  nhất.
                </div>
                <div className={cx("banner__button")}>
                  <button className={cx("banner__button--down")}>
                    Tải Ngay &nbsp; &gt;
                  </button>
                </div>
              </div>
              <div className={cx("banner__img")}>
                <img
                  src={bannerDownImg}
                  alt="join"
                  className={cx("img__banner")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Banner2;
