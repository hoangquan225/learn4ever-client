import { ApiConfig } from "./config";
import { Category } from "../submodule/models/category";
import EndPoint from "../submodule/common/endpoint";

export const apiLoadCategorys = async (payload: { status: number }) => {
  return ApiConfig(EndPoint.GET_CATEGORYS_BY_STATUS, payload);
};

// export const apiUpdateCategory = (payload: { status: number }) => {
//   return ApiConfig("/update-category-by-status", payload);
// };
