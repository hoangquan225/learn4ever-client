import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";

export const apiLoadTopicByCourse = async (params: {
  idCourse: string;
  type: number;
  parentId?: string;
}) => {
  return ApiConfig(EndPoint.GET_TOPIC_BY_COURSE, { params });
};
