import io from "socket.io-client";
import {
  deleteCommentSoket,
  updateCommentSocket,
} from "../redux/slices/commentSlice";
import { Comment } from "../submodule/models/comment";
import { UserInfo } from "../submodule/models/user";
import { deleteChatSoket, updateChatSocket } from "../redux/slices/chatSlice";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { Message } from "../submodule/models/message";
// import notificationSound from "../assets/sounds/notification.mp3";

const REACT_APP_ENDPOINT =
  process.env.REACT_APP_ENDPOINT || "http://localhost:3001";

export class SocketService {
  // private userInfo = useAppSelector(
  //   (state: RootState) => state.authState.userInfo
  // );

  private socket: any;
  public init = () => {
    this.socket = io(REACT_APP_ENDPOINT, {
      path: "/api/socketio/",
      transports: ["websocket"],
      reconnection: true,
      timeout: 1000,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 30000,
      // query: {
      //   userId: this.userInfo._id,
      // },
    });

    this.socket.on("connect", () => {
      console.log("connecttion socket successfully");
    });

    this.socket.on("connect_error", (err: any) => {
      console.log(`connecttion socket error` + err);
    });

    return this;
  };

  joinSocket = (props: { userInfo: UserInfo | null }) => {
    // console.log({ props, socket: this.socket });
    this.socket.emit("join_socket", props).on("join_socket", (msg: string) => {
      console.log(msg);
    });
    // this.socket.on("getOnlineUsers", (users) => {
    // });
  };

  joinComment = (props: { idTopic: string; userInfo: UserInfo }) => {
    this.socket
      .emit("join_room_comment", props)
      .on("join_room_comment", (msg: string) => {
        console.log(msg);
      });
  };

  loadComment = (dispatch: any) => {
    this.socket.on("send-comment", (data: { comment: Comment }) => {
      dispatch(updateCommentSocket(data.comment));
      console.log(data);
    });
  };

  updateComment = (dispatch: any) => {
    // console.log('hello');
    this.socket.on("update-comment", (data: { comment: Comment }) => {
      dispatch(updateCommentSocket(data.comment));
      console.log(data);
    });
  };

  deleteComment = (dispatch: any) => {
    // console.log('hello');

    this.socket.on(
      "delete-comment",
      (data: { id: string; idTopic: string }) => {
        dispatch(deleteCommentSoket(data));
      }
    );
  };

  leaveComment = (props: { idTopic: string; userInfo: UserInfo }) => {
    this.socket
      .emit("leave_room_comment", props)
      .on("leave_room_comment", (msg: string) => {
        // console.log(msg);
      });
  };

  writingComment = (props: { idTopic: string; userInfo: UserInfo | null }) => {
    // console.log({ props, socket: this.socket });
    this.socket
      .emit("writing_comment", props)
      .on("writing_comment", (msg: UserInfo) => {
        // console.log(msg);
      });
  };

  joinChat = (props: { roomId: string; userInfo: UserInfo }) => {
    this.socket
      .emit("join_room_chat", props)
      .on("join_room_chat", (msg: string) => {
        console.log(msg);
      });
  };

  loadChat = (dispatch: any) => {
    this.socket.on("send-chat", (data: { chat: Message }) => {
      // const sound = new Audio(notificationSound);
      // sound.play();
      dispatch(updateChatSocket(data.chat));
    });
  };

  updateChat = (dispatch: any) => {
    this.socket.on("update-chat", (data: { chat: Message }) => {
      dispatch(updateChatSocket(data.chat));
    });
  };

  deleteChat = (dispatch: any) => {
    this.socket.on(
      "delete-chat",
      (data: { id: string; idTopic: string }) => {
        dispatch(deleteChatSoket(data));
      }
    );
  };

  leaveChat = (props: { idTopic: string; userInfo: UserInfo }) => {
    this.socket
      .emit("leave_room_chat", props)
      .on("leave_room_chat", (msg: string) => {
        // console.log(msg);
      });
  };

  writingChat = (props: { idTopic: string; userInfo: UserInfo | null }) => {
    // console.log({ props, socket: this.socket });
    this.socket
      .emit("writing_chat", props)
      .on("writing_chat", (msg: UserInfo) => {
        // console.log(msg);
      });
  };
}
