import { Avatar, Button, Drawer, message, notification } from "antd";
import classNames from "classnames/bind";
import { FaChevronDown, FaChevronUp, FaEllipsisH } from "react-icons/fa";
import { AvatarIcon } from "../icons/icons";
import styles from "./comment.module.scss";
import reactionBuon from "../../assets/img/reactionBuon.svg";
import reactionHaha from "../../assets/img/reactionHaha.svg";
import reactionLike from "../../assets/img/reactionLike.svg";
import reactionPhanno from "../../assets/img/reactionPhanno.svg";
import reactionThuong from "../../assets/img/reactionThuong.svg";
import reactionTim from "../../assets/img/reactionTim.svg";
import reactionWow from "../../assets/img/reactionWow.svg";
import TinyMCEEditor from "../TinyMCE";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "tinymce";
import { Topic } from "../../submodule/models/topic";
import { useAppDispatch } from "../../redux/hook";
import { commentState, requestLoadComments, requestUpdateComment } from "../../redux/slices/commentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authState } from "../../redux/slices/userSlice";
import { Comment } from "../../submodule/models/comment";

const cx = classNames.bind(styles);

type CommentProps = {
  placement: any;
  open: boolean;
  onClose: () => void;
  width: string | number;
  zIndex: number;
  className: string;
  dataTopicActive: Topic
};

const FCComment = (props: CommentProps) => {
  const { dataTopicActive } = props
  const dispatch = useAppDispatch()
  const commentStates = useSelector(commentState)
  const userStates = useSelector(authState)
  const [openComment, setOpenComment] = useState<boolean>(false)
  const content = useRef<Editor>()

  console.log(commentStates.loading); // tạo giao diện loading comments

  const handleCreateComment = async () => {
    setOpenComment(false)
    const text = content.current?.getContent()
    const idTopic = dataTopicActive.id
    console.log(new Comment({
      content: text,
      idTopic,
      idUser: userStates.userInfo?._id,
      index: commentStates.comments.length + 1
    }));

    try {
      const res = await dispatch(requestUpdateComment(new Comment({
        content: text,
        idTopic,
        idUser: userStates.userInfo?._id,
        index: commentStates.comments.length + 1
      })))
      unwrapResult(res)
    } catch (error) {
      message.error('lỗi server, không gửi được comment')
    }
  }

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
          <div className={cx("comment__inner")}>
            <div className={cx("comment__heading")}>
              <h4 className={cx("comment__heading--count")}>So binh luan</h4>
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
                  {
                    openComment
                      ? (
                        <div>
                          <TinyMCEEditor
                            editorRef={content}
                            // keyMCE={`${Math.random()}`}
                            placeholder='Bạn có thắc mắc gì trong bài học này?'
                            height={200}
                          />
                          <div>
                            {/* css nhé */}
                            <Button
                              onClick={() => {
                                setOpenComment(false)
                              }}
                            >Huỷ</Button>
                            <Button
                              onClick={handleCreateComment}
                            >Bình luận</Button>
                          </div>
                        </div>
                      )
                      : (
                        <span
                          onClick={() => {
                            setOpenComment(true)
                          }}
                        >Bạn có thắc mắc gì trong bài học này?</span>
                      )
                  }
                </div>
              </div>
            </div>

            <div className={cx("comment__detail")}>
              <div className={cx("comment__avt--wrapper")}>
                <AvatarIcon className={cx("comment__avt--fallback")} />
              </div>
              <div className={cx("comment__detail--cmtbody")}>
                <div className={cx("comment__detail--cmtinner")}>
                  <div className={cx("comment__detail--cmtwrapper")}>
                    <div className={cx("comment__detail--cmtcontent")}>
                      <div className={cx("comment__detail--heading")}>
                        <span>bom dep trai</span>
                      </div>
                      <div className={cx("comment__detail--text")}>
                        <p>
                          co le can mot cai bau duoi.....co le can mot cai bau
                          duoi.....co le can mot cai bau duoi.....co le can mot
                          cai bau duoi.....co le can mot cai bau duoi.....
                        </p>
                      </div>
                      <div className={cx("comment__detail--showMore")}>
                        <strong>Mở rộng</strong>
                        <FaChevronDown
                          className={cx("comment__detail--icon")}
                        />
                        {/* <strong>Thu nhỏ</strong>
                        <FaChevronUp className={cx("comment__detail--icon")} /> */}
                      </div>
                      <div className={cx("comment__detail--react")}>
                        <Avatar.Group
                          maxCount={7}
                          className={cx("comment__detail--reactGroup")}
                          size={20}
                        >
                          <Avatar src={reactionLike} />
                          <Avatar src={reactionTim} />
                          <Avatar src={reactionThuong} />
                          <Avatar src={reactionHaha} />
                          <Avatar src={reactionWow} />
                          <Avatar src={reactionBuon} />
                          <Avatar src={reactionPhanno} />
                        </Avatar.Group>
                        <div className={cx("comment__detail--reactNum")}>
                          12
                        </div>
                      </div>
                    </div>
                    <div className={cx("comment__detail--cmttime")}>
                      <div className={cx("comment__detail--create")}>
                        <div className={cx("comment__detail--createLeft")}>
                          <button className={cx("comment__detail--like")}>
                            <span className={cx("comment__detail--liketext")}>
                              Thích
                            </span>
                          </button>
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
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default memo(FCComment);
