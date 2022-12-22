import { ApiConfig } from "./config";
import EndPoint from "../submodule/common/endpont"

export const apiGetUserFromToken = (token: string) => {
    return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {
        token
    });
}

export const apiUpdateUser = async (payload: { userInfo: any }) => {
    return ApiConfig(EndPoint.UPDATE_USER, payload)
}
