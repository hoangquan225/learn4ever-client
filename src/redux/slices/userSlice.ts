import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "../../submodule/models/user";
import _ from "lodash";
import { apiChangePassword, apiUpdateUser } from "../../api/user";
import { apiGetUserFromToken } from "../../api/user";
import TTCSconfig from "../../submodule/common/config";

export interface UserState {
  users: UserInfo[];
  loading: boolean;
  error: string;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: "",
  userInfo: null,
};

export const requestUpdateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (props: { token: string; userInfo: UserInfo }) => {
    const res = await apiUpdateUser(props);
    return res.data;
  }
);

export const requestChangePassword = createAsyncThunk(
  "user/changePassword",
  async (props: { token: any; password: string; newPassword: string }) => {
    const res = await apiChangePassword(props);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestUpdateUserInfo];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });

    /**
     * update user info
     */
    builder.addCase(
      requestUpdateUserInfo.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.loading = false;
      }
    );

    /**
     * changePassword
     */
    builder.addCase(requestChangePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestChangePassword.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.loginCode === TTCSconfig.STATUS_SUCCESS)
          state.userInfo = new UserInfo(action.payload.userInfo);
        console.log(action.payload);
      }
    );
    // builder.addCase(
    //   requestChangePassword.rejected,
    //   (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //   }
    // );
  },
});

export const userState = (state: RootState) => state.userState;

export default userSlice.reducer;
