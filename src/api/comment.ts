import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";
import { Comment } from "../submodule/models/comment";

export const apiUpdateComment = async (payload: Comment) => {
  return ApiConfig(EndPoint.UPDATE_COMMENT, { payload });
};

export const apiLoadComments = async (params: {
  idTopic: string;
  limit?: number;
  skip?: number;
}) => {
  return ApiConfig(EndPoint.GET_COMMENT, { params });
};
