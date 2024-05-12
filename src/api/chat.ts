import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";
import { Message } from "../submodule/models/message";

export const apiUpdateChat = async (payload: Message) => {
  return ApiConfig(EndPoint.UPDATE_CHAT, { payload });
};

export const apiLoadChats = async (params: {
  userIdSend: string,
  userIdReceive: string,
  roomId: string;
  limit?: number;
  skip?: number;
}) => {
  return ApiConfig(EndPoint.GET_CHAT, { params });
};

export const apiSendReactionChat = async (payload: {
  idChat: string;
  idUser: string;
  type: number;
}) => {
  return ApiConfig(EndPoint.SEND_REACTION_CHAT, { payload });
};

export const apiDeleteChat = async (payload: {
  idChat: string;
  idTopic: string;
}) => {
  return ApiConfig(EndPoint.DELETE_CHAT, { payload });
};

export const getOrCreateRoomChat = async (payload: {
  userIdSend: any;
  userIdReceive: any;
}) => {
  return ApiConfig("/room-chat/get-or-craete", { payload });
};

export const getFriendRoomChat = async (payload: {
  userId: any;
}) => {
  return ApiConfig("/room-chat/get-friend", { payload });
};

export const findByEmail = async (payload: {
  email: any;
}) => {
  return ApiConfig("/user/find-by-email", { payload });
};

