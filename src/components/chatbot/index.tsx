import classNames from "classnames/bind";
import styles from "./chatbot.module.scss";
import React, { useState } from "react";
import { Input, Button, List, Avatar, Row, Col } from "antd";
import {
  MessageOutlined,
  MinusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import {
  FaFacebookMessenger,
  FaPaperclip,
  FaPaperPlane,
  FaWindowMinimize,
} from "react-icons/fa";
import logo from "../../assets/img/learn4ever-icon.png";
import logo1 from "../../assets/img/logo.png";
import { GrSubtract } from "react-icons/gr";

const cx = classNames.bind(styles);

type ChatbotMessage = {
  id: string;
  message: string;
  isUser: boolean;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [modalChatBot, setModalChatBot] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatbotMessage = {
        id: new Date().toISOString(),
        message: inputValue,
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

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
      <div onClick={() => setModalChatBot(true)} className={cx("btn__chatbot")}>
        <FaFacebookMessenger />
        <span>Chat</span>
      </div>

      <Modal
        getContainer={false}
        className={cx("chatbot__modal")}
        title={
          <div className={cx("chatbot__modal--title")}>
            <img className={cx("chatbot__logo")} src={logo} alt="logo" />
            <div className={cx("chatbot__title-text")}>
              <p>Learn4ever</p>
              <span>Gửi hỗ trợ đến chúng tôi</span>
            </div>
          </div>
        }
        open={modalChatBot}
        closeIcon={<MinusOutlined />}
        onCancel={() => setModalChatBot(false)}
        footer={
          <div className={cx("chatbot__modal--footer")}>
            <FaPaperclip className={cx("footer__icon")} />
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSendMessage}
              bordered={false}
            />
            <FaPaperPlane
              className={cx("footer__icon")}
              onClick={handleSendMessage}
            />
          </div>
        }
        width={360}
        mask={false}
      >
        <div className={cx("chatbot__message-list")}>
          <div
            className={cx(
              "chatbot__message-item",
              "chatbot__message-item--bot"
            )}
          >
            <p className={cx("chatbot__message-content")}>
              Chào bạn, bạn đang tìm hiểu và cần hỗ trợ về vấn đề gì? Hãy kết
              nối với chúng tôi!
            </p>
          </div>
          {messages.map((item) => (
            <div
              className={cx("chatbot__message-item", {
                "chatbot__message-item--user": item.isUser,
                "chatbot__message-item--bot": !item.isUser,
              })}
              key={item.id}
            >
              <p className={cx("chatbot__message-content")}>{item.message}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* <div className={cx("chatbot__view-1")}>
        <div className={cx("chatbot__view")}>
          <div>
            <div>
              <img src={logo} alt="" />
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
       */}
    </>
  );
};

export default Chatbot;
