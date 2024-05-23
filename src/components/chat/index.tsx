import classNames from "classnames/bind";
import styles from "./chat.module.scss";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Input, List, Avatar, Drawer, Space, notification, Form, Dropdown, MenuProps, Button, Empty, Upload } from "antd";
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
import { chatState, requestLoadChats, requestUpdateChat, setChats } from "../../redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { authState } from "../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { apiLoadChats, findByEmail, getFriendRoomChat, getOrCreateRoomChat } from "../../api/chat";
import { RealtimeContext } from "../../App";
import { useSelector } from "react-redux";
import { UserInfo } from "../../submodule/models/user";
import TTCSconfig from "../../submodule/common/config";
import { Message } from "../../submodule/models/message";
import { GrAttachment } from "react-icons/gr";
import { apiUploadFile } from "../../api/upload";
const cx = classNames.bind(styles);

type MessageProps = {
  placement?: any;
  width: string | number;
  zIndex: number;
  className: string;
};

const Chat = (props: MessageProps) => {
  const [chat, setChat] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);
  const [listFriends, setListFriends] = useState<any[]>([]);
  const [userReceive, setUserReceive] = useState<UserInfo>();
  const [items, setItems] = useState<MenuProps['items']>([{
    label: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    key: -1,
  }]);
  
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(authState).userInfo;
  const [userIdReceive, setUserIdReceive] = useState('');
  const [roomId, setRoomId] = useState<any>();
  const realtime = useContext(RealtimeContext);
  const chatStates = useSelector(chatState);
  const [form] = Form.useForm();
  const [skip, setSkip] = useState(0);
  const [isTotalChat, setIsTotalChat] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userInfo?._id && chat) {
      handleLoadFriend(userInfo?._id)
    }
  },[userInfo?._id, chat])

  useEffect(() => {
    if (userIdReceive && roomId) {
      // handleLoadChat()
      handleLoadChatByRedux()
    }
  },[roomId])

  // useEffect(() => {
  //   if (skip) {
  //     handleLoadChat(TTCSconfig.LIMIT, skip);
  //   }
  //   if (chatStates.chats.length === chatStates.total) {
  //     setIsTotalChat(true);
  //   }
  // }, [skip]);
  
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatStates, listRef]);

  const handleScroll = (e: any) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && !isTotalChat) {  
      setSkip((prevSkip) => prevSkip + TTCSconfig.LIMIT);
    }
  };

  const openDetailMessenger = async (item) => {
    setUserIdReceive(item.user._id)
    const res = await getOrCreateRoomChat({userIdSend: userInfo?._id, userIdReceive: item.user._id})
    setRoomId(res?.data.data._id);
    setUserReceive(item.user)
    userInfo &&  realtime.joinChat({ roomId: res?.data.data._id, userInfo });
    realtime.loadChat(dispatch);
    realtime.updateChat(dispatch);
    setChatDetail(true);
  }

  const openMessengerByFind = async (item) => {
    setUserIdReceive(item._id)
    const res = await getOrCreateRoomChat({userIdSend: userInfo?._id, userIdReceive: item._id})
    setRoomId(res?.data.data._id);
    handleLoadFriend(userInfo?._id)
    setUserReceive(item)
    userInfo &&  realtime.joinChat({ roomId: res?.data.data._id, userInfo });
    realtime.loadChat(dispatch);
    realtime.updateChat(dispatch);
    realtime.deleteChat(dispatch);
    setChatDetail(true);
  }

  const handleLoadFriend = async (userId) => {
    const res = await getFriendRoomChat({userId})
    setListFriends(res.data.data)
  }

  const handleSendMessage = async (values) => {
    const {message} = values
    if (message.trim()) {
      try {
        const res = await dispatch(
          requestUpdateChat(
            new Message({
              roomId: roomId,
              userIdSend: userInfo?._id,
              userIdReceive: userIdReceive,
              users: [userInfo?._id, userIdReceive],
              content: message,
              type: 1
            })
          )
        );
        unwrapResult(res);
        form.resetFields();
      } catch (error) {
        notification.error({
          message: "lỗi server, không gửi được tin nhắn",
          duration: 1.5,
        });
      }
    }
  };

  const handleSendMessageTypeFile = async (url, type) => {
    try {
      const res = await dispatch(
        requestUpdateChat(
          new Message({
            roomId: roomId,
            userIdSend: userInfo?._id,
            userIdReceive: userIdReceive,
            users: [userInfo?._id, userIdReceive],
            content: url,
            type: type
          })
        )
      );
      unwrapResult(res);
    } catch (error) {
      notification.error({
        message: "lỗi server, không gửi được tin nhắn",
        duration: 1.5,
      });
    }
  }

  const handleLoadChatByRedux = async (limit?: number, skip?: number) => {
    try {
      const res = await dispatch(
        requestLoadChats({
          userIdSend: `${userInfo?._id}`,
          userIdReceive: userIdReceive,
          roomId: roomId,
          limit: 100,
          skip,
        })
      );
      unwrapResult(res);
    } catch (error) {
      // console.log(error);
      notification.error({
        message: "lỗi server, không tải được dữ liệu",
        duration: 1.5,
      });
    }
  };

  const handleLoadChat = async (limit?: number, skip?: number) => {
    try {
      const res = await apiLoadChats({
        userIdSend: `${userInfo?._id}`,
        userIdReceive: userIdReceive,
        roomId: roomId,
        limit: 100,
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

  const handleSearch = async (e) => {
    console.log(e.target.value);
    if(e.target.value.trim()) {
      const res = await findByEmail({email: e.target.value})
      if(res.data.data[0]) {
        setItems(res.data.data.map(item => ({
          label: (
            <>
              <Avatar src={item.avatar} />
              <span style={{marginLeft: "16px", fontSize: "1.4rem", fontWeight: "500"}}>{item.name}</span>
            </>
          ),
          key: item._id,
          onClick: async () => openMessengerByFind(item),
        })))
      } else {
        setItems([{
          label: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
          key: -1,
        }])
      }
      
    }
  }
  return (
    <>
      {userInfo?._id 
        ? 
        <div onClick={() => setChat(true)} className={cx("btn__chatbot", props.className)}>
          <FaFacebookMessenger />
          <span>Message</span>
        </div>
        : <></>
      }

      <Drawer 
        title="Message"
        placement={props.placement}
        // onClose={props.onClose}
        // open={props.open}
        onClose={() => setChat(false)}
        open={chat}
        width={props.width}
        zIndex={props.zIndex}
      >
        <div className={cx("chat__view")}>
          <Sider collapsedWidth="0" width={"100%"} className={cx("chatbot__sider")}>
            <div className={cx("chatbot__sider--top")}>
              <Dropdown 
                menu={{ items }} 
                trigger={['click']} 
                overlayStyle={{maxHeight: "200px", overflowY: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"
              }}
              >
                <Input
                  placeholder="Hãy nhập email của bạn bè"
                  style={{ marginBottom: 8 }}
                  className={cx("chatbot__sider--search")}
                  onPressEnter={handleSearch}
                />
              </Dropdown>
            </div>
            <List
              className={cx("chatbot__friends--list")}
              dataSource={listFriends}
              renderItem={(item) => (
                <List.Item className={cx("chatbot__friends--item")} onClick={() => openDetailMessenger(item)}>
                  <List.Item.Meta
                    className={cx("chatbot__friends--item-meta")}
                    avatar={<Avatar src={item.user.avatar} />}
                    title={item.user.name}
                  />
                </List.Item>
              )}
            />
          </Sider>
        </div>
      </Drawer>

      <Drawer 
        title={userReceive?.name}
        onClose={() => setChatDetail(false)} 
        open={chatDetail}
        width={650}
        style={{
        }}
        extra={
          <Space>
            <Avatar
              className={cx("comment__avt")}
              src={userReceive?.avatar}
            />
          </Space>
        }
        bodyStyle={{padding: "0 8px"}}
      >
        <div>
          {/* <div className={cx("chatbot__msg--info")}>
            <img
              src={userReceive?.avatar}
              alt="avatar"
              className={cx("chatbot__msg--info-img")}
            />
            <span className={cx("chatbot__msg--info-name")}>{userReceive?.name}</span>
          </div> */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className={cx("chatbot__msg--list")}
            style={{ overflow: "auto", height: "calc(100vh - 50px - 73px - 32px)", marginBottom: "16px"}}
          >
            {chatStates.chats.map((message) => (
              <div
                className={message.userIdSend === userInfo?._id ? 
                  cx("chatbot__message", "chatbot__message--user") : 
                  cx("chatbot__message", "chatbot__message--bot")
                }
                key={message.id}
              >
                {
                  message.type === 2 
                  ? 
                    <div className={cx("comment__detail--img")} onClick={() => {
                      setPreview(true)
                      setPreviewImage(message.content)
                    }}>
                      <img src={message.content} alt="" />
                    </div>
                  :
                    <div className={cx("comment__detail--text")} >
                      {message.content}
                    </div>
                }
              </div>
            ))}
          </div>
          <Modal
            open={preview}
            footer={null}
            onCancel={() => {
              setPreview(false)
              setPreviewImage('')
            }}
          >
            <img alt="avatar" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          {/* <List
            ref={listRef}
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
                <div
                      className={cx("comment__detail--text")}
                      dangerouslySetInnerHTML={{
                        __html: message.message,
                      }}
                    ></div>
              </List.Item>
            )}
            itemLayout="horizontal"
            style={{ overflow: "auto", height: "65vh",  margin: "16px 0" }}
          /> */}
          <div className={cx("chatbot__msg--action")}>
            <Form
              style={{ width: "100%" }}
              form={form}
              onFinish={handleSendMessage}
            >
              <Form.Item 
                name="message" 
                style={{margin: "unset"}}
              >
                <div style={{display: "flex", alignItems: "center", gap: "16px" }}>
                  <Upload
                    className={cx("profile__avatar--upload")}
                    customRequest={async (options) => {
                      const { file } = options;
                      try {
                        // setIsLoad(false);
                        const res = await apiUploadFile(file);
                        handleSendMessageTypeFile(res.data, 2)
                        // setAvatarUrl(res.data);
                      } catch (error: any) {
                        notification.error({
                          message: "Lỗi server",
                          duration: 1.5,
                        });
                      }
                    }}
                    maxCount={1}
                    accept="image/*"
                    showUploadList={false}
                  >
                    <GrAttachment className={cx("chatbot__msg--action-icon")} />
                  </Upload>

                  <Input
                    className={cx("chatbot__msg--input")}
                    placeholder="Nhập tin nhắn..."
                    prefix=""
                    suffix={
                      <Button type="text" htmlType="submit">
                        <FaTelegramPlane className={cx("chatbot__msg--action-icon")}/>
                      </Button>  
                    }
                  />
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default memo(Chat);
