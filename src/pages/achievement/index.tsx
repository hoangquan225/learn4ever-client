import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./achievement.module.scss";
import { Col, Row, Select, TabsProps, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState, requestLoadCategoryBySlug } from "../../redux/slices/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TTCSconfig from "../../submodule/common/config";
const cx = classNames.bind(styles);

const AchievementPages = () => {
  const dispatch = useAppDispatch();
  const categoryStates = useAppSelector(categoryState);
  const { categoryInfo, courses, categorys }  = categoryStates;
  const [courseList, setCourseList] = useState<any[]>([]);
  const [selectTag, setSelectTag] = useState<any>();
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  useEffect(() => {
    const coursePublic = courses.filter(
      (course) => course.status === TTCSconfig.STATUS_PUBLIC
    );
    setCourseList(coursePublic);
  }, [courses]);

  const loadCategory = async (slug: string) => {
    try {
      const result = await dispatch(
        requestLoadCategoryBySlug({
          slug,
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

  const onChangeCategory = (slug) => {
    loadCategory(slug)
  }

  const onChangeTabs = (id) => {
    setSelectTag(id);
    console.log(id);
    
  };

  const nextTab = () => {
    if (tabsContainerRef.current !== null) {
      tabsContainerRef.current.scrollLeft -= 1000;
    }
  }
  
  const prevTab = () => {
    if (tabsContainerRef.current !== null) {
      tabsContainerRef.current.scrollLeft += 1000; 
    }
  }

  return (
    <>
      <Header />
      <div className={cx("achievement")}>
        <div className={cx("wide")}>
          <div className={cx("achievement__wrapper")}>
            <div className={cx("achievement__container")}>
              <h1 className={cx("achievement__heading")}>Kết quả học tập</h1>
              <Row>
                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Select
                    className={cx("achievement__select")}
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        Chọn lớp
                      </React.Fragment>
                    }
                    value={categorys[0]?.slug}
                    size={"large"}
                    listHeight={128}
                    // onChange={onChangeCategory}
                  >
                    {categorys?.map((data) => (
                      <Select.Option
                        value={data?.slug}
                        key={data?.slug}
                        label={
                          <React.Fragment>
                            {data?.name}
                          </React.Fragment>
                        }
                        
                      >
                        {data?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                  <div className={cx("tab__tag")} ref={tabsContainerRef}>
                    <button className={cx("arrow-button")} onClick={() => prevTab()}>❮</button>
                    {courseList.length > 0 &&
                    courseList?.map(e => {
                      return <div key={e._id} className={e._id !== selectTag ? cx("tab__tag_item") : cx("tab__tag_item", "active")} onClick={() => onChangeTabs(e._id)}>{e.courseName}</div>
                    })}
                    {/* <div className={cx("tab__tag_item", "active")}>Toán</div> */}
                    <button className={cx("arrow-button")} onClick={() => nextTab()}>❯</button>
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

export default AchievementPages;
