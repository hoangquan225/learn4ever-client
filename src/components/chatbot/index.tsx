import {
  MinusOutlined
} from "@ant-design/icons";
import { Input } from "antd";
import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookMessenger,
  FaPaperPlane,
  FaPaperclip
} from "react-icons/fa";
import logo from "../../assets/img/learn4ever-icon.png";
import styles from "./chatbot.module.scss";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

type ChatbotMessage = {
  message: string;
  type: string;
  isUser: boolean;
  path?: string
};

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [modalChatBot, setModalChatBot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = useAppSelector(
    (state: RootState) => state.authState.userInfo
  );

  const messagesEndRef: any = useRef(null);

  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatbotMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const setMessagesLocalStorage = (messages) => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }

  const scrollToBottom = () => {
    console.log("a");
    
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      const newMessage: ChatbotMessage = {
        message: inputValue,
        type: "text",
        isUser: true,
      };
      setInputValue("");
      setMessages([...messages, newMessage]);
      const responseBot = await handleRasa(inputValue);
      if(typeof responseBot === 'object' && !!responseBot.length) {
        setMessages([...messages, newMessage, ...responseBot]);
        setMessagesLocalStorage([...messages, newMessage, ...responseBot])
      } else {
        setMessages([...messages, newMessage, responseBot]);
        setMessagesLocalStorage([...messages, newMessage, responseBot])
      }
      setIsLoading(false);
    }
  };

  const handleRasa = async (message: string) => {
    try {
      const sender = JSON.stringify({
        userId: userInfo?._id,
        aaa: "63e14eaa1174bb4a93a0de40"
      })
      const res = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: sender,
        message: message
      })
      const data: any = res.data[0]
      if(data?.text) {
        const newMessage: ChatbotMessage = {
          message: data.text,
          type: "text",
          isUser: false,
        };
        return newMessage
      } else if(data?.custom) {
        const arrayMes = data?.custom?.data?.map(e => ({
          message: e.message,
          type: e.type,
          isUser: false,
          path: e.path
        }))
        return arrayMes;
        // setMessages([. ..messages, ...arrayMes]);
      }
      return [];
    } catch (error) {
      setIsLoading(false);
      return [];
    }
  }

  useEffect(() => {
  }, [messages])

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
          {messages?.map((item) => {
            switch(item?.type) {
              case 'text':
                return (
                  <div
                    className={cx("chatbot__message-item", {
                      "chatbot__message-item--user": item?.isUser,
                      "chatbot__message-item--bot": !item?.isUser,
                    })}
                    key={Math.random()}
                  >
                    {/* <p className={cx("chatbot__message-content")}>{item?.message}</p> */}
                    <div
                      className={cx("chatbot__message-content")}
                      dangerouslySetInnerHTML={{
                        __html: item.message,
                      }}
                    ></div>
                  </div>
                );

              case 'redict':
                return (
                  <div
                    className={cx("chatbot__message-item", {
                      "chatbot__message-item--user": item?.isUser,
                      "chatbot__message-item--bot": !item?.isUser,
                    })}
                    key={Math.random()}
                    onClick={() => item?.path ? navigate(`${item?.path}`) : null}
                  >
                    <p className={cx("chatbot__message-content")}>{item?.message}</p>
                  </div>
                );
              default:
                return '';
            }
            
          })}
          {isLoading &&  
            <div
              className={cx("chatbot__message-item", "chatbot__message-item--bot")}
              key={Math.random()}
            >
              <div id="loading-container">
                <div id="loading-dots">
                  <div className={cx("loading-dot")}></div>
                  <div className={cx("loading-dot")}></div>
                  <div className={cx("loading-dot")}></div>
                </div>
              </div>
            </div>
          }
          <div style={{width: "100%", float: "left"}} ref={messagesEndRef} />
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
