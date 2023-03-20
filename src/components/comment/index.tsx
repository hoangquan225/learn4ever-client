import { unwrapResult } from "@reduxjs/toolkit";
import { Avatar, Drawer, message, notification, Tooltip } from "antd";
import classNames from "classnames/bind";
import { Fragment, memo, useContext, useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Editor } from "tinymce";
import { apiLoadComments } from "../../api/comment";
import reactionBuon from "../../assets/img/reactionBuon.svg";
import reactionHaha from "../../assets/img/reactionHaha.svg";
import reactionLike from "../../assets/img/reactionLike.svg";
import reactionPhanno from "../../assets/img/reactionPhanno.svg";
import reactionThuong from "../../assets/img/reactionThuong.svg";
import reactionTim from "../../assets/img/reactionTim.svg";
import reactionWow from "../../assets/img/reactionWow.svg";
import { useAppDispatch } from "../../redux/hook";
import {
  commentState,
  requestSendReactionComment,
  requestUpdateComment,
  setComments,
} from "../../redux/slices/commentSlice";
import { authState } from "../../redux/slices/userSlice";
import TTCSconfig from "../../submodule/common/config";
import { Comment } from "../../submodule/models/comment";
import { Topic } from "../../submodule/models/topic";
import { AvatarIcon } from "../icons/icons";
import TinyMCEEditor from "../TinyMCE";
import styles from "./comment.module.scss";
import { RealtimeContext } from "../../App";

const cx = classNames.bind(styles);

const ReactType = [
  { icon: reactionLike, title: "Thích", name: "like" },
  { icon: reactionTim, title: "Yêu thích", name: "love" },
  { icon: reactionThuong, title: "Thương thương", name: "care" },
  { icon: reactionHaha, title: "Haha", name: "haha" },
  { icon: reactionWow, title: "Wow", name: "wow" },
  { icon: reactionBuon, title: "Buồn", name: "sad" },
  { icon: reactionPhanno, title: "Phẫn nộ", name: "angry" },
];

type CommentProps = {
  placement: any;
  open: boolean;
  onClose: () => void;
  width: string | number;
  zIndex: number;
  className: string;
  dataTopicActive: Topic;
};

const FCComment = (props: CommentProps) => {
  const { dataTopicActive } = props;
  const drawerRef = useRef(null);
  const content = useRef<Editor>();
  const dispatch = useAppDispatch();
  const commentStates = useSelector(commentState);
  const userStates = useSelector(authState);
  const realtime = useContext(RealtimeContext);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [skip, setSkip] = useState(0);
  const [isTotalComment, setIsTotalComment] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [selectedReaction, setSelectedReaction] = useState(null);

  useEffect(() => {
    if (skip) {
      handleLoadComment(TTCSconfig.LIMIT, skip);
    }

    if (commentStates.comments.length === commentStates.total) {
      setIsTotalComment(true);
    }
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    setIsTotalComment(false);
  }, [dataTopicActive?.id]);

  const handleLike = () => {
    if (selectedReaction !== null) {
      setSelectedReaction(null);
    }
  };

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop >= scrollHeight - clientHeight && !isTotalComment) {
      setSkip((prevSkip) => prevSkip + TTCSconfig.LIMIT);
    }
  };

  const handleLoadComment = async (limit?: number, skip?: number) => {
    try {
      const res = await apiLoadComments({
        idTopic: dataTopicActive?.id || "",
        limit,
        skip,
      });
      dispatch(setComments(res.data.data));
    } catch (error) {
      console.log(error);
      notification.error({
        message: "lỗi server, không tải được dữ liệu",
        duration: 1.5,
      });
    }
  };

  const handleCreateComment = async () => {
    const text = content.current?.getContent();
    const idTopic = dataTopicActive.id;

    try {
      const res = await dispatch(
        requestUpdateComment(
          new Comment({
            content: text,
            idTopic,
            idUser: userStates.userInfo?._id,
            index: commentStates.comments.length + 1,
          })
        )
      );
      unwrapResult(res);
    } catch (error) {
      message.error("lỗi server, không gửi được comment");
    } finally {
      setOpenComment(false);
    }
  };

  const handleSendReactionComment = async (type: number, idComment: string | undefined) => {
    try {
      if (!idComment || !userStates.userInfo?._id) {
        message.error("không cập nhật được !!");
        return
      }
      const res = await dispatch(requestSendReactionComment({
        idComment,
        idUser: userStates.userInfo?._id,
        type
      }));
      unwrapResult(res);
    } catch (error) {
      message.error("lỗi server !!");
    }
  };

  const ItemComment = (comment: Comment, key: number) => {
    const { userInfo, content, react, id } = comment;
    return (
      <div className={cx("comment__detail")} key={key}>
        <div className={cx("comment__avt--wrapper")}>
          {userInfo?.avatar ? (
            <Avatar src={userInfo?.avatar} />
          ) : (
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              {userInfo?.name.charAt(0)}
            </Avatar>
          )}
        </div>
        <div className={cx("comment__detail--cmtbody")}>
          <div className={cx("comment__detail--cmtinner")}>
            <div className={cx("comment__detail--cmtwrapper")}>
              <div className={cx("comment__detail--cmtcontent")}>
                <div className={cx("comment__detail--heading")}>
                  <span>{userInfo?.name}</span>
                </div>
                <div
                  className={cx("comment__detail--text")}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></div>
                {/* <div className={cx("comment__detail--showMore")}>
                  <strong>Mở rộng</strong>
                  <FaChevronDown
                    className={cx("comment__detail--icon")}
                  />
                  <strong>Thu nhỏ</strong>
                  <FaChevronUp className={cx("comment__detail--icon")} />
                </div> */}
                {react && react?.length > 0 && (
                  <div className={cx("comment__detail--react")}>
                    <Avatar.Group
                      maxCount={7}
                      className={cx("comment__detail--reactGroup")}
                      size={20}
                    >
                      {react?.map((item) => {
                        return <Avatar src={ReactType[item.type].icon} />;
                      })}
                    </Avatar.Group>
                    <div className={cx("comment__detail--reactNum")}>
                      {react?.length}
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("comment__detail--cmttime")}>
                <div className={cx("comment__detail--create")}>
                  <div className={cx("comment__detail--createLeft")}>
                    <Tooltip
                      title={ReactType.map((reaction, key) => {
                        return (
                          <Fragment key={key}>
                            <Tooltip
                              title={reaction.title}
                              showArrow={false}
                              mouseEnterDelay={0.2}
                              mouseLeaveDelay={0}
                              overlayClassName={cx("reaction__title")}
                            >
                              <img
                                src={reaction.icon}
                                alt="cam xuc"
                                className={cx("reaction__icon")}
                                onClick={() => handleSendReactionComment(key, id)}
                              />
                            </Tooltip>
                          </Fragment>
                        );
                      })}
                      placement="topLeft"
                      trigger="hover"
                      showArrow={false}
                      overlayClassName={cx("tooltip__reactions")}
                    >
                      <span
                        // className={cx("comment__detail--liketext", {
                        //   "comment__detail--liketext--selected":
                        //     selectedReaction === null,
                        // })}
                        className={
                          selectedReaction === null
                            ? cx("comment__detail--liketext")
                            : cx("comment__detail--liketext--selected")
                        }
                        onClick={handleLike}
                      >
                        {selectedReaction ? selectedReaction : "Thích"}
                      </span>
                    </Tooltip>
                    ·
                    <span className={cx("comment__detail--replytext")}>
                      Trả lời
                    </span>
                  </div>
                  <div className={cx("comment__detail--createRight")}>
                    ·
                    <span className={cx("comment__detail--time")}>
                      14 giờ trước
                    </span>
                    <span className={cx("comment__detail--more")}>
                      ·
                      <button className={cx("comment__detail--morebtn")}>
                        <FaEllipsisH
                          className={cx("comment__detail--moreicon")}
                        />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cx("comment")}>
        <Drawer
          className={props.className}
          placement={props.placement}
          onClose={props.onClose}
          open={props.open}
          width={props.width}
          zIndex={props.zIndex}
        >
          <div
            style={{ height: "100%", overflow: "auto" }}
            ref={drawerRef}
            onScroll={handleScroll}
          >
            <div className={cx("comment__inner")}>
              <div className={cx("comment__heading")}>
                <h4 className={cx("comment__heading--count")}>
                  {commentStates.total} Bình luận
                </h4>
                <p className={cx("comment__heading--help")}>
                  (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
                </p>
              </div>

              <div className={cx("comment__cmtbox")}>
                <div className={cx("comment__avt--wrapper")}>
                  <AvatarIcon className={cx("comment__avt--fallback")} />
                </div>
                <div className={cx("comment__content--wrapper")}>
                  <div className={cx("comment__content--placeholder")}>
                    {openComment ? (
                      <div className={cx("comment__content--tinymce")}>
                        <TinyMCEEditor
                          editorRef={content}
                          // keyMCE={`${Math.random()}`}
                          placeholder="Bạn có thắc mắc gì trong bài học này?"
                          height={300}
                          onChange={(value: string) => {
                            // Nếu timeoutId đã được đặt trước đó, hủy bỏ
                            if (timeoutId) {
                              window.clearTimeout(timeoutId);
                            }

                            // Đặt timeout để gọi sau 2 giây
                            setTimeoutId(
                              window.setTimeout(() => {
                                // console.log(`Kết quả: ${value}`);

                                dataTopicActive.id &&
                                  userStates.userInfo &&
                                  realtime.writingComment({
                                    idTopic: dataTopicActive.id || "",
                                    userInfo: userStates.userInfo,
                                  });
                              }, 800)
                            );
                          }}
                        />
                        <div className={cx("comment__content--action")}>
                          <button
                            className={cx(
                              "comment__content--btn",
                              "cancel-btn"
                            )}
                            onClick={() => {
                              setOpenComment(false);
                            }}
                          >
                            Huỷ
                          </button>
                          <button
                            className={cx(
                              "comment__content--btn",
                              "accept-btn"
                            )}
                            onClick={handleCreateComment}
                          >
                            Bình luận
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span
                        onClick={() => {
                          setOpenComment(true);
                        }}
                      >
                        Bạn có thắc mắc gì trong bài học này?
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {commentStates.comments.map((comment, key) => {
                return ItemComment(comment, key);
              })}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default memo(FCComment);
