import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpoint";

export const apiLoadTopicByCourse = async (params: {
  idCourse: string;
  type: number;
  parentId?: string;
}) => {
  return ApiConfig(EndPoint.GET_TOPIC_BY_COURSE, { params });
};

export const apiLoadQuestionsByTopic = async (params: {
  idTopic: string;
  status: number;
}) => {
  return ApiConfig(EndPoint.GET_QUESTIONS_BY_TOPIC, { params });
};

export const apiLoadTopicById = async (params: { id: string }) => {
  return ApiConfig(EndPoint.GET_TOPIC_BY_ID, { params });
};

export const apiLoadLessonByIdTopic = async (params: {
  status: number;
  idTopic: string;
}) => {
  return ApiConfig(EndPoint.GET_LESSONS_BY_IDTOPIC, { params });
};
