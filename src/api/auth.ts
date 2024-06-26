import { ApiConfig } from "./config";
import { UserInfo } from "../submodule/models/user";
import EndPoint from "../submodule/common/endpoint";

export const apiLogin = (payload: { account: string; password: string }) => {
  return ApiConfig(EndPoint.LOGIN, { payload });
};

export const apiRegister = (payload: { userInfo: UserInfo }) => {
  return ApiConfig(EndPoint.REGISTER, { payload });
};

export const apiLogout = (payload: { idUser: string }) => {
  return ApiConfig(EndPoint.LOGOUT, { payload });
};

export const apiLoginWithGoogle = (payload: {
  name: string;
  account: string;
  googleId: string;
  avatar: string;
  email: string;
}) => {
  return ApiConfig(EndPoint.LOGIN_WITH_GOOGLE, { payload });
};

export const apiForgotPassword = (payload: {
  email: string;
}) => {
  return ApiConfig(EndPoint.FORGOT_PASSWORD, { payload });
};

export const apiCheckTokenExpires = (payload: {
  token: string;
}) => {
  return ApiConfig(EndPoint.CHECK_TOKEN_EXPIRES, { payload });
};

export const apiResetPassword = (payload: {
  token: string;
  newPassword: string;
}) => {
  return ApiConfig(EndPoint.RESET_PASSWORD, { payload });
};