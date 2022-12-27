import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";
import { UserInfo } from "../submodule/models/user";

export const apiLogin = (payload: { account: string; password: string }) => {
  return ApiConfig(EndPoint.LOGIN, payload);
};

export const apiRegister = (payload: { userInfo: UserInfo }) => {
  return ApiConfig(EndPoint.REGISTER, payload);
};

export const getPost = () => {
  const payload = {};
  return ApiConfig("posts", payload, "get");
};
