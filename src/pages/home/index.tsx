import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Header from "../../components/header";
import Banner1 from "../../components/banner1";
import Banner2 from "../../components/banner2";
import Panel from "../../components/panel";
import Feedback from "../../components/feedback";
import Footer from "../../components/footer";
import { Carousel } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaComments, FaFacebookMessenger } from "react-icons/fa";
import { Category } from "../../submodule/models/category";
import Chatbot from "../../components/chatbot";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import bannerImg from "../../assets/img/banner.webp";
import bannerImg1 from "../../assets/img/banner1.webp";
import bannerImg2 from "../../assets/img/banner2.webp";
import bannerImg3 from "../../assets/img/banner3.webp";
import bannerImg4 from "../../assets/img/banner4.webp";
import bannerImg5 from "../../assets/img/banner5.webp";
import bannerImg6 from "../../assets/img/banner6.webp";
import Chat from "../../components/chat";
import { useCallback, useState } from "react";

const cx = classNames.bind(styles);

const HomePages = () => {
  const categoryStates = useAppSelector(categoryState);
  const categorys = categoryStates.categorys;
  const dispatch = useAppDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categoryList: Category[] = [];
  for (var key in categorys) {
    if (categorys.hasOwnProperty(key)) {
      categoryList.push(categorys[key]);
    }
  }

  const PrevArrowCarousel = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "#000",
          fontSize: "2rem",
        }}
        onClick={onClick}
      >
        <FaChevronLeft />
      </div>
    );
  };

  const NextArrowCarousel = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "#000",
          fontSize: "2rem",
        }}
        onClick={onClick}
      >
        <FaChevronRight />
      </div>
    );
  };

  return (
    <>
      <div className={cx("home")}>
        <Header />
        {/* <Banner1 /> */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide> 
            <a href="/lop-12">
              <img src={bannerImg1} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="/de-thi-thu">
              <img src={bannerImg2} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide>
          {/* <SwiperSlide>
            <a href="/tai-lieu">
              <img src={bannerImg3} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide> */}
          <SwiperSlide>
            <a href="/lop-11">
              <img src={bannerImg4} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide>
          <SwiperSlide> 
            <a href="/lop-10">
              <img src={bannerImg5} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide>
          <SwiperSlide> 
            <a href="#">
              <img src={bannerImg6} alt="bannerimage" className={cx("banner-img")} />
            </a>
          </SwiperSlide>
        </Swiper>
        
        <Chatbot />
        {/* <div onClick={handleOpenChat} className={cx("btn__chatbot")}>
          <FaFacebookMessenger />
          <span>Messenger</span>
        </div>
        {isChatOpen && <Chat 
          className={cx("chat__drawer")}
          placement={"right"}
          open={isChatOpen}
          onClose={handleCloseChat}
          width={400}
          zIndex={6}
        />} */}

        <Chat 
          className={cx("chat__drawer")}
          placement={"right"}
          width={400}
          zIndex={6}
        />
        
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

              <Carousel
                className={cx("category__carousel")}
                dots={true}
                autoplay={true}
                pauseOnDotsHover={true}
                pauseOnFocus={true}
                infinite={true}
                draggable={false}
                autoplaySpeed={4000}
                initialSlide={0}
                slidesToShow={3}
                slidesToScroll={3}
                arrows={true}
                nextArrow={<NextArrowCarousel />}
                prevArrow={<PrevArrowCarousel />}
                responsive={[
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      initialSlide: 0,
                      arrows: false,
                      draggable: true,
                    },
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 0,
                      arrows: false,
                      draggable: true,
                    },
                  },
                ]}
              >
                {categorys[0] &&
                  categorys?.map((data, index) => (
                    <Link
                      key={index}
                      to={data.slug}
                      className={cx("category__link")}
                    >
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
                          <div
                            className={cx("category__des")}
                            dangerouslySetInnerHTML={{
                              __html: data.des ?? "",
                            }}
                          />
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
                  ))}
              </Carousel>
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
