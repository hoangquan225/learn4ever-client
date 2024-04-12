import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";
import { UserInfo } from "../submodule/models/user";
import { TopicProgress } from "../submodule/models/topicProgress";

export const apiGetUserFromToken = () => {
  return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {

  });
};

export const apiUpdateUser = async (payload: {
  token: string;
  userInfo: UserInfo;
}) => {
  return ApiConfig(EndPoint.UPDATE_USER, { payload });
};

export const apiChangePassword = async (payload: {
  token: any;
  password: string;
  newPassword: string;
}) => {
  return ApiConfig(EndPoint.CHANGE_PASSWORD, { payload });
};

export const apiUpdateStudiedForUser = async (payload: {
  idTopic: string;
  idUser: string;
  status?: number;
  timeStudy: number;
  score?: number;
  correctQuestion?: number;
  answers?: Array<{
    idQuestion: string;
    idAnswer: string;
  }>;
}) => {
  return ApiConfig(EndPoint.UPDATE_STUDYED_FOR_USER, { payload });
};

export const apiUpsertTopicProgress = async (payload: any) => {
  return ApiConfig("/update-topic-progress", { payload });
};

export const apiGetTopicProgressForAchievement = async (payload: any) => {
  return ApiConfig("/get-topic-progress-for-achievement", { payload });
};

