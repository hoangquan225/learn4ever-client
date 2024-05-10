import classNames from "classnames/bind";
import styles from "./chat.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { Input, Button, List, Avatar, Row, Col, Drawer, Space, message, notification } from "antd";
import {
  MessageOutlined,
  MinusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import {
  FaFacebookMessenger,
  FaLink,
  FaTelegramPlane,
} from "react-icons/fa";
import Sider from "antd/es/layout/Sider";
import { chatState, requestUpdateChat, setChats } from "../../redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Message } from "../../submodule/models/chat";
import { authState } from "../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { apiLoadChats } from "../../api/chat";
import { RealtimeContext } from "../../App";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

type ChatbotMessage = {
  id: string;
  message: string;
  isUser: boolean;
};

const Chat = () => {
  // const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);
  const dispatch = useAppDispatch();
  // const [userIdReceive, setUserIdReceive] = useState();
  const userInfo = useAppSelector(authState).userInfo;
  const [userIdReceive, setUserIdReceive] = useState('');
  const realtime = useContext(RealtimeContext);
  const chatStates = useSelector(chatState);

  let friends = [
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Quan",
    },
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Hung",
    },
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Son",
    },
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Ha",
    },
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Tan",
    },
    {
      src: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
      title: "Duy",
    },
  ];

  console.log(chatStates);
  

  let messages = [
    {
      message: "co cong viec gi khong a",
      isMe: true,
    },
    {
      message: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
  ];

  useEffect(() => {
    if (userIdReceive) {
      handleLoadChat()
    }
  },[userIdReceive])


  // useEffect(() => {
  //   messages = chatStates.chats.map((e => ({
  //     message: e.content,
  //     isMe: e.userIdSend === userInfo?._id
  //   })))
  //   console.log(chatStates.chats);
  // },[chatStates.chats])
  

  const openDetailMessenger = () => {
    setChatDetail(true);
    setUserIdReceive(userInfo?._id || '')
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage: ChatbotMessage = {
        id: new Date().toISOString(),
        message: inputValue,
        isUser: true,
      };
      try {
        const res = await dispatch(
          requestUpdateChat(
            new Message({
              // idChat: ,
              userIdSend: userInfo?._id,
              userIdReceive: "663deeed03a238f27ccd63f8",
              users: [userInfo?._id, "663deeed03a238f27ccd63f8"],
              content: inputValue,
            })
          )
        );
        unwrapResult(res);
        // setMessages([...messages, newMessage]);
        setInputValue("");
      } catch (error) {
        message.error("lỗi server, không gửi được comment");
      }
    }
  };

  const handleLoadChat = async (limit?: number, skip?: number) => {
    try {
      const res = await apiLoadChats({
        userIdSend: `${userInfo?._id}`,
        userIdReceive: `663deeed03a238f27ccd63f8`,
        limit,
        skip,
      });
      dispatch(setChats(res.data.data));
    } catch (error) {
      // console.log(error);
      notification.error({
        message: "lỗi server, không tải được dữ liệu",
        duration: 1.5,
      });
    }
  };

  return (
    <>
      <div onClick={() => setChat(true)} className={cx("btn__chatbot")}>
        <FaFacebookMessenger />
        <span>Messenger</span>
      </div>

      <Drawer 
        title="Messenger" 
        onClose={() => setChat(false)} 
        open={chat}
        width={400}
      >
        <div className={cx("chat__view")}>
          <Sider collapsedWidth="0" width={"100%"} className={cx("chatbot__sider")}>
            <div className={cx("chatbot__sider--top")}>
              <Input.Search
                placeholder="Tìm kiếm bạn bè"
                style={{ marginBottom: 8 }}
                className={cx("chatbot__sider--search")}
              />
            </div>
            <List
              className={cx("chatbot__friends--list")}
              dataSource={friends}
              renderItem={(item) => (
                <List.Item className={cx("chatbot__friends--item")} onClick={() => openDetailMessenger()}>
                  <List.Item.Meta
                    className={cx("chatbot__friends--item-meta")}
                    avatar={<Avatar src={item.src} />}
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          </Sider>
        </div>
      </Drawer>

      <Drawer 
        title="Đoạn chat" 
        onClose={() => setChatDetail(false)} 
        open={chatDetail}
        width={650}
        style={{
        }}
        extra={
          <Space>
            <Avatar
              className={cx("comment__avt")}
              src=""
            />
          </Space>
        }
      >
        <div>
          <div className={cx("chatbot__msg--info")}>
            <img
              src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
              alt="avatar"
              className={cx("chatbot__msg--info-img")}
            />
            <span className={cx("chatbot__msg--info-name")}>Quan</span>
          </div>
          <List
            className={cx("chatbot__msg--list")}
            dataSource={chatStates.chats.map(e => ({
              message: e.content,
              isMe: e.userIdSend === userInfo?._id
            }))}
            renderItem={(message) => (
              <List.Item
                className={cx("chatbot__message", {
                  "chatbot__message--user": message.isMe === true,
                  "chatbot__message--bot": message.isMe === false,
                })}
              >
                {/* <List.Item.Meta
                  description={message.desc}
                /> */}
                <div
                      className={cx("comment__detail--text")}
                      dangerouslySetInnerHTML={{
                        __html: message.message,
                      }}
                    ></div>
              </List.Item>
            )}
            itemLayout="horizontal"
            style={{ overflow: "auto", height: "75vh",  margin: "16px 0" }}
          />
          <div className={cx("chatbot__msg--action")}>
            <FaLink className={cx("chatbot__msg--action-icon")} />
            <Input.TextArea
              className={cx("chatbot__msg--input")}
              rows={1}
              placeholder="Aa"
              autoSize={{ minRows: 1, maxRows: 5 }}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <FaTelegramPlane className={cx("chatbot__msg--action-icon")} onClick={handleSendMessage}/>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Chat;
