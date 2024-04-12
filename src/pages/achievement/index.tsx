import classNames from "classnames/bind";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./achievement.module.scss";
import { Button, Col, Popconfirm, Row, Select, Table, TabsProps, Tooltip, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { categoryState, requestLoadCategoryBySlug } from "../../redux/slices/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import TTCSconfig from "../../submodule/common/config";
import { Course } from "../../submodule/models/course";
import { authState } from "../../redux/slices/userSlice";
import { requestLoadTopicProgressForAchievement, topicProgressState } from "../../redux/slices/topicProgressSlice";
import { ColumnsType } from "antd/es/table";
import { Topic } from "../../submodule/models/topic";
import { TopicProgress } from "../../submodule/models/topicProgress";
import moment from "moment";
import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

interface DataType {
  key: string;
  idTopic: string;
  idCourse: string;
  score: number;
  timeStudy: number;
  type: number;
  createDate: number;
  lastUpdate: number;
  path: String;
  topicInfo: Topic;
}

const AchievementPages = () => {
  const dispatch = useAppDispatch();
  const categoryReducer = useAppSelector(categoryState);
  const { categoryInfo, courses, categorys } = categoryReducer;
  const userReducer = useAppSelector(authState);
  const userInfo = userReducer.userInfo;
  const topicProgressReducer = useAppSelector(topicProgressState);
  const { progress } = topicProgressReducer;
  const navigate = useNavigate();

  const [courseList, setCourseList] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<any>();
  const [valueCategory, setValueCategory] = useState<any>(categorys[0]?.slug);
  const [datas, setDatas] = useState<DataType[]>([]);
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const convertDataToTable = (value: TopicProgress) => {
    return {
      key:`${value._id || Date.now()}`,
      idTopic: value?.idTopic || "",
      idCourse: value?.idCourse || "",
      score: value?.score || 0,
      timeStudy: value?.timeStudy || 0,
      type: value?.type || 0,
      createDate: value?.createDate || 0,
      lastUpdate: value?.lastUpdate || 0,
      path: value?.path || "",
      topicInfo: new Topic(value?.topicInfo)
    };
  };

  useEffect(() => {
    setValueCategory(categorys[0]?.slug);
  }, [categorys]);

  useEffect(() => {
    if(valueCategory) {
      loadCategory(valueCategory || categorys[0]?.slug);
    }
  }, [valueCategory]);

  useEffect(() => {
    const coursePublic: Course[] = courses.filter(
      (course) => course.status === TTCSconfig.STATUS_PUBLIC
    );
    setCourseList(coursePublic);
    setSelectedCourseId(coursePublic[0]?.id)
  }, [courses]);

  useEffect(() => {
    const coursePublic: Course[] = courses.filter(
      (course) => course.status === TTCSconfig.STATUS_PUBLIC
    );
    setCourseList(coursePublic);
    setSelectedCourseId(coursePublic[0]?.id)
  }, [courses]);

  useEffect(() => {
    setDatas(progress?.map((o) => convertDataToTable(o)));
  }, [progress]);

  useEffect(() => {
    loadTopicProgressForAchievement(userInfo?._id || '', selectedCourseId)
    // setDatas(progress?.map((o) => convertDataToTable(o)));
  }, [selectedCourseId]);

  const loadTopicProgressForAchievement = async ( idUser: string, idCourse?: string, idTopic?: string, type?: number) => {
    try {
      const result = await dispatch(
        requestLoadTopicProgressForAchievement({
          idUser, 
          idCourse, 
          idTopic, 
          type
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
    setValueCategory(slug)
    // loadCategory(slug)
    if (tabsContainerRef.current !== null) {
      tabsContainerRef.current.scrollLeft = 0;
    }
  }

  const onChangeTabs = (id) => {
    setSelectedCourseId(id);
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

  const columnsExam: ColumnsType<DataType> = [
    {
      title: "STT",
      key: "stt",
      align: "center",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Đề thi đã làm",
      dataIndex: "topicInfo",
      key: "name",
      align: "center",
      render: (value: Topic) => (
        <span>{value.name}</span>
      ),
    },
    {
      title: "Điểm số",
      dataIndex: "score",
      key: "score",
      align: "center",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "timeStudy",
      key: "timeStudy",
      align: "center",
      render: (value) => <span>{value} phút</span>,
    },
    {
      title: "Ngày làm",
      key: "lastUpdate",
      dataIndex: "lastUpdate",
      align: "center",
      render: (value: number) => (
        <span>{moment(value).format("DD/MM/YYYY hh:mm")}</span>
      ),
    },
    {
      title: "",
      key: "action",
      dataIndex: "path",
      align: "center",
      render: (value, record) => (
        <Popconfirm
          placement="top"
          title="Bạn muốn chuyển đến bài làm? Bài làm sẽ bắt đầu khi bạn ấn OK"
          onConfirm={() =>
            navigate(`${value}`)
          }
          okText="Yes"
          cancelText="No"
        >
          <button
            className={cx(
              "exam__panel--btn"
            )}
          >
            <span>Làm ngay</span>
            <BiChevronRight
              className={cx(
                "exam__panel--icon"
              )}
            />
          </button>
        </Popconfirm>
      ),
    },
  ];

  const columnsLesson: ColumnsType<DataType> = [
    {
      title: "STT",
      key: "stt",
      align: "center",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Bài giảng đã học",
      dataIndex: "topicInfo",
      key: "name",
      align: "center",
      render: (value: Topic) => (
        <span>{value.name}</span>
      ),
    },
    {
      title: "Dạng bài học",
      dataIndex: "topicInfo",
      key: "topicType",
      align: "center",
      render: (value) => {
        switch (value.topicType) {
          case TTCSconfig.TYPE_TOPIC_VIDEO:
            return <span>Video</span>;
          case TTCSconfig.TYPE_TOPIC_DOCUMENT:
            return <span>Tài liệu</span>;
          case TTCSconfig.TYPE_TOPIC_PRATICE:
            return <span>Bài tập</span>;
          default:
            return <span>Document</span>;
        }
      }
    },
    {
      title: "Ngày học",
      key: "lastUpdate",
      dataIndex: "lastUpdate",
      align: "center",
      render: (value: number) => (
        <span>{moment(value).format("DD/MM/YYYY hh:mm")}</span>
      ),
    },
    {
      title: "",
      key: "action",
      dataIndex: "path",
      align: "center",
      render: (value: TopicProgress, record) => (
        <Popconfirm
          placement="top"
          title="Bạn muốn chuyển đến khóa học này?"
          onConfirm={() =>
            navigate(`${value}`)
          }
          okText="Yes"
          cancelText="No"
        >
          <button
            className={cx(
              "exam__panel--btn"
            )}
          >
            <span>Khóa học</span>
            <BiChevronRight
              className={cx(
                "exam__panel--icon"
              )}
            />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className={cx("achievement")}>
        <div className={cx("wide")}>
          <div className={cx("achievement__wrapper")}>
            <div className={cx("achievement__container")}>
              <h1 className={cx("achievement__heading")}>Kết quả học tập</h1>
              <Row style={{marginBottom: "30px"}}>
                <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                  <Select
                    className={cx("achievement__select")}
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>  
                        Chọn lớp
                      </React.Fragment>
                    }
                    value={valueCategory}
                    size={"large"}
                    listHeight={128}
                    onChange={onChangeCategory}
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
                <Col xl={19} lg={19} md={19} sm={19} xs={19} style={{display: "flex", justifyContent: "end"}}>
                  <div className={cx("tab__tag")} ref={tabsContainerRef}>
                    <button className={cx("arrow-button")} onClick={() => prevTab()}>❮</button>
                    {courseList.length > 0 &&
                    courseList?.map(e => {
                      return <div key={e.id} className={e.id !== selectedCourseId ? cx("tab__tag_item") : cx("tab__tag_item", "active")} onClick={() => onChangeTabs(e.id)}>{e.courseName}</div>
                    })}
                    {/* <div className={cx("tab__tag_item", "active")}>Toán</div> */}
                    <button className={cx("arrow-button")} onClick={() => nextTab()}>❯</button>
                  </div>
                </Col>
              </Row>

              <div className={cx("achievement__item")}>
                <div style={{padding: "0 16px"}}>
                  <div className={cx("achievement__title")}>
                    <span>Đề thi gần đây</span>
                  </div>
                  <div>
                    <Table dataSource={datas?.filter(e => e.type === 2)} columns={columnsExam} />
                  </div>
                </div>
              </div>
              <div className={cx("achievement__item")}>
                <div style={{padding: "0 16px"}}>
                  <div className={cx("achievement__title")}>
                    <span>Bài học gần đây</span>
                  </div>
                  <div>
                    <Table dataSource={datas?.filter(e => e.type === 1)} columns={columnsLesson} />
                  </div>
                </div>
              </div>
            </div>s
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AchievementPages;
