import classNames from "classnames/bind";
import { BulbIcon, MistakeIcon, RiseIcon, SitIcon } from "../icons/icons";
import styles from "./panel.module.scss";

const cx = classNames.bind(styles);

const Panel = () => {
  return (
    <>
      <div className={cx("panel")}>
        <div className={cx("wide")}>
          <div className={cx("panel__title")}>
            <h2>Phương pháp phát triển</h2>
            <p>khả năng tự học của học thông minh</p>
          </div>

          <div className={cx("panel__content")}>
            <div className={cx("panel__list")}>
              <div className={cx("panel__item", "panel__doub--item")}>
                <div className={cx("panel__item")}>
                  <div className={cx("panel__item--wrapper1")}>
                    <BulbIcon className={cx("panel__icon", "icon1")} />
                    <div>Rèn luyện tư duy</div>
                  </div>
                </div>
                <div className={cx("panel__item")}>
                  <div className={cx("panel__item--wrapper2")}>
                    <SitIcon className={cx("panel__icon", "icon2")} />
                    <div>
                      Chủ động lập kế hoạch
                      <br />
                      học tập hợp lý
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("panel__item")}>
                <div className={cx("panel__item--wrapper3")}>
                  <RiseIcon className={cx("panel__icon", "icon3")} />
                  <div>Mục tiêu học tập rõ ràng</div>
                </div>
              </div>
              <div className={cx("panel__item")}>
                <div className={cx("panel__item--wrapper4")}>
                  <MistakeIcon className={cx("panel__icon", "icon4")} />
                  <div>Học từ những sai lầm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
