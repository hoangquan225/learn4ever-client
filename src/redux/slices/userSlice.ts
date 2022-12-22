import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "../../submodule/models/user"
import _ from "lodash";
import { apiUpdateUser } from "../../api/user";
import { apiGetUserFromToken } from "../../api/user";

export interface UserState {
  users: UserInfo[],
  loading: boolean,
  error: string,
  userInfo: UserInfo | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
  userInfo: null
};

export const requestUpdateUserInfo = createAsyncThunk("user/updateUserInfo", async (props: { userInfo: string }) => {
  const res = await apiUpdateUser(props);
  return res.data
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestUpdateUserInfo];
    actionList.forEach(action => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      })
    })

    /**
    * update user info
    */
    builder.addCase(requestUpdateUserInfo.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.loading = false;
    })
  }
});

export const userState = (state: RootState) => state.userState;

export default userSlice.reducer;