import { ApiConfig } from "./config"

export const apiLogin = async (payload: { account: string, password: string }) => {
    return ApiConfig('login', payload)
}