import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpont";
import { UserInfo } from "../submodule/models/user";

export const apiGetUserFromToken = (token: string) => {
  return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {
    token,
  });
};

export const apiUpdateUser = async (payload: {
  token: string;
  userInfo: UserInfo;
}) => {
  return ApiConfig(EndPoint.UPDATE_USER, payload);
};

export const apiChangePassword = async (payload: {
  token: string;
  password: string;
  newPassword: string;
}) => {
  return ApiConfig(EndPoint.CHANGE_PASSWORD, payload);
};
