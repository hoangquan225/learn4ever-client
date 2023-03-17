import ENDPONTAPI from "../submodule/common/endpoint"
import { ApiUploadFile } from "./config"

export const apiUploadFile = async (file: any, fieldName?: any) => {
    return ApiUploadFile(ENDPONTAPI.UPLOAD, file, fieldName)
}
