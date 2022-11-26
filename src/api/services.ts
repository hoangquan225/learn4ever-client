import { ApiConfig } from "./config";

export const apiLogin = (payload: { account: string; password: string }) => {
  return ApiConfig("login", payload);
};

export const getPost = () => {
  const payload = {};
  return ApiConfig("posts", payload, "get");
};
