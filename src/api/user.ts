import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";
import { UserInfo } from "../submodule/models/user";

export const apiGetUserFromToken = (token: string) => {
  return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {
    payload: {
      token,
    },
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
