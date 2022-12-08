import {
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import logoImg from "../../assets/img/logo.png";
import logoYoutube from "../../assets/img/youtube.svg";
import logoFacebook from "../../assets/img/facebook.svg";
import logoPinterest from "../../assets/img/pinterest.svg";
import logoTwitter from "../../assets/img/twitter.svg";
import logoDmca from "../../assets/img/dmca.png";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <>
      <footer className={cx("footer")}>
        <div className={cx("wide")}>
          <div className={cx("footer__container")}>
            <Row style={{ width: "100%" }} gutter={16}>
              <Col className={cx("footer__col")} sm={4} md={6} lg={8}>
                <div className={cx("footer__info")}>
                  <span className={cx("footer__info-item")}>
                    <img
                      src={logoImg}
                      alt="logo"
                      className={cx("footer__logo")}
                    />
                  </span>
                </div>
                <div className={cx("footer__info")}>
                  <span className={cx("footer__info-item")}>
                    Phát triển bởi Nhom24_TTCS Học viện kỹ thuật Mật Mã
                  </span>
                </div>
                <div className={cx("footer__info")}>
                  <span className={cx("footer__item-item")}>
                    <PushpinOutlined className={cx("footer__icon")} />
                    141 Đường Chiến Thắng, Xã Tân Triều, Huyện Thanh Trì, Hà Nội
                  </span>
                </div>
                <div className={cx("footer__info")}>
                  <span className={cx("footer__item-item")}>
                    <MailOutlined className={cx("footer__icon")} />
                    nhom24_ttcs@gmail.com
                  </span>
                </div>
                <div className={cx("footer__info")}>
                  <span className={cx("footer__info-item")}>
                    <PhoneOutlined className={cx("footer__icon")} />
                    0123456789
                  </span>
                </div>
              </Col>
              <Col
                className={cx("footer__col")}
                sm={4}
                md={6}
                lg={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Row style={{ width: "100%" }}>
                  <Col className={cx("footer__col")} span={12}>
                    <div className={cx("footer__nav--title")}>Về chúng tôi</div>
                    <div className={cx("footer__nav--item")}>
                      <a href="" className={cx("footer__nav--link")}>
                        Giới thiệu
                      </a>
                    </div>
                    <div className={cx("footer__nav--item")}>
                      <a href="" className={cx("footer__nav--link")}>
                        Liên hệ
                      </a>
                    </div>
                  </Col>
                  <Col className={cx("footer__col")} span={12}>
                    <div className={cx("footer__nav--title")}>Chính sách</div>
                    <div className={cx("footer__nav--item")}>
                      <a href="" className={cx("footer__nav--link")}>
                        Điều khoản sử dụng
                      </a>
                    </div>
                    <div className={cx("footer__nav--item")}>
                      <a href="" className={cx("footer__nav--link")}>
                        Chính sách bảo mật
                      </a>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className={cx("footer__col")} sm={4} md={6} lg={8}>
                <div className={cx("footer__social")}>
                  <div className={cx("footer__social--title")}>
                    Kết nối với learn4ever
                  </div>
                  <div className={cx("footer__social--icon")}>
                    <a href="" className={cx("footer__social--link")}>
                      <span className={cx("footer__social--wrapper")}>
                        <img
                          src={logoFacebook}
                          alt="facebook"
                          className={cx("footer__social--img")}
                        />
                      </span>
                    </a>
                    <a href="" className={cx("footer__social--link")}>
                      <span className={cx("footer__social--wrapper")}>
                        <img
                          src={logoPinterest}
                          alt="pinterest"
                          className={cx("footer__social--img")}
                        />
                      </span>
                    </a>
                    <a href="" className={cx("footer__social--link")}>
                      <span className={cx("footer__social--wrapper")}>
                        <img
                          src={logoTwitter}
                          alt="twitter"
                          className={cx("footer__social--img")}
                        />
                      </span>
                    </a>
                    <a href="" className={cx("footer__social--link")}>
                      <span className={cx("footer__social--wrapper")}>
                        <img
                          src={logoYoutube}
                          alt="youtube"
                          className={cx("footer__social--img")}
                        />
                      </span>
                    </a>
                  </div>
                  <div className={cx("footer__protect")}>
                    <a href="" className={cx("footer__protect--link")}>
                      <img
                        src={logoDmca}
                        alt="dmca-protect"
                        className={cx("footer__protect--img")}
                      />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
