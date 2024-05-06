import classNames from "classnames/bind";
import styles from "./chat.module.scss";
import React, { useState } from "react";
import { Input, Button, List, Avatar, Row, Col, Drawer, Space } from "antd";
import {
  MessageOutlined,
  MinusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import {
  FaFacebookMessenger,
  FaLink,
  FaPaperclip,
  FaPaperPlane,
  FaTelegramPlane,
  FaWindowMinimize,
} from "react-icons/fa";
import logo from "../../assets/img/learn4ever-icon.png";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
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

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };
  // const handleSendMessage = () => {
  //   if (inputValue.trim()) {
  //     const newMessage: ChatbotMessage = {
  //       id: new Date().toISOString(),
  //       message: inputValue,
  //       isUser: true,
  //     };
  //     setMessages([...messages, newMessage]);
  //     setInputValue("");
  //   }
  // };

  const friends = [
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

  const messages = [
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    {
      desc: "xem cac danh gia va cap nhat luon",
      isMe: false,
    },
    {
      desc: "da oke sep",
      isMe: true,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    {
      desc: "xem cac danh gia va cap nhat luon",
      isMe: false,
    },
    {
      desc: "da oke sep",
      isMe: true,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    {
      desc: "xem cac danh gia va cap nhat luon",
      isMe: false,
    },
    {
      desc: "da oke sep",
      isMe: true,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
    
    {
      desc: "xem cac danh gia va cap nhat luon",
      isMe: false,
    },
    {
      desc: "da oke sep",
      isMe: true,
    },
    {
      desc: "co cong viec gi khong a",
      isMe: true,
    },
    {
      desc: "chinh sua cac bai hoc di nhe",
      isMe: false,
    },
  ];

  const openDetailMessenger = () => {
    setChatDetail(true);
  }

  // const handleSubmit = () => {
  //   const newMessage: ChatbotMessage = {
  //     id: new Date().toISOString(),
  //     message: inputValue,
  //     isUser: true,
  //   };
  //   setMessages([...messages, newMessage]);
  //   // Xử lý response của chatbot và thêm vào messages
  //   setInputValue("");
  // };

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
            dataSource={messages}
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
                        __html: message.desc,
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
              // onPressEnter={handleSendMessage}
              // value={message}
              // onChange={handleChangeMessage}
            />
            <FaTelegramPlane className={cx("chatbot__msg--action-icon")} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Chat;
