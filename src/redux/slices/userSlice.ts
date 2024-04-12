import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "../../submodule/models/user";
import { apiCheckTokenExpires, apiForgotPassword, apiLogin, apiLoginWithGoogle, apiRegister, apiResetPassword } from "../../api/auth";
import {
  apiChangePassword,
  apiGetUserFromToken,
  apiUpdateStudiedForUser,
  apiUpdateUser,
} from "../../api/user";
import TTCSconfig from "../../submodule/common/config";
// import _ from "lodash";

export interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  loadingCheckLogin: boolean;
  data: {
    data: any,
    status: any,
    message: any
  } | {}
  loadingForgot: boolean;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  loadingCheckLogin: true,
  data: {},
  loadingForgot: false,
}
export const requestLogin = createAsyncThunk(
  "auth/login",
  async (props: { account: string; password: string }) => {
    const res = await apiLogin(props);
    return res.data;
  }
);

export const requestRegister = createAsyncThunk(
  "auth/register",
  async (props: { userInfo: UserInfo }) => {
    const res = await apiRegister(props);
    return res.data;
  }
);

export const requestLoginWithGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (props: {
    name: string;
    account: string;
    googleId: string;
    avatar: string;
    email: string;
  }) => {
    const res = await apiLoginWithGoogle(props);
    return res.data;
  }
);

export const requestGetUserFromToken = createAsyncThunk(
  "user/requestGetUserFromToken",
  async () => {
    const res = await apiGetUserFromToken();
    return res.data;
  }
);

export const requestUpdateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (props: { token: any; userInfo: any }) => {
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

export const requestUpdateStudiedForUser = createAsyncThunk(
  "user/updateStudiedForUser",
  async (props: {
    idTopic: string;
    idCourse: string;
    idUser: string;
    status?: number;
    timeStudy: number;
    score?: number;
    correctQuestion?: number;
    answers?: Array<{
      idQuestion: string;
      idAnswer: string;
    }>;
  }) => {
    const res = await apiUpdateStudiedForUser(props);
    return res.data;
  }
);

export const requestForgotPassword = createAsyncThunk(
  "user/requestForgotPassword",
  async (props: { email: any; }) => {
    const res = await apiForgotPassword(props);
    return res.data;
  }
);

export const requestCheckTokenExpires = createAsyncThunk(
  "user/requestCheckTokenExpires",
  async (props: { token: string }) => {
    const res = await apiCheckTokenExpires(props);
    return res.data;
  }
);

export const requestResetPassword = createAsyncThunk(
  "user/requestResetPassword",
  async (props: { token: string; newPassword: string; }) => {
    const res = await apiResetPassword(props);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      console.log({ user: action.payload });

      state.userInfo = action.payload;
    },
    setLoadingCheckLogin: (state, action: PayloadAction<boolean>) => {
      state.loadingCheckLogin = action.payload
    }
  },
  extraReducers: (builder) => {
    /**
     * login
     */
    builder.addCase(requestLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestLogin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userInfo = new UserInfo(action.payload.userLogin);
      }
    );
    builder.addCase(requestLogin.rejected, (state) => {
      state.loading = false;
    });

    // requestGetUserFromToken
    builder.addCase(requestGetUserFromToken.pending, (state) => {
      state.loadingCheckLogin = true;
    });
    builder.addCase(
      requestGetUserFromToken.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: number;
          userInfo: UserInfo;
        }>
      ) => {
        state.userInfo = action.payload.userInfo;
        state.loadingCheckLogin = false;
      }
    );
    builder.addCase(requestGetUserFromToken.rejected, (state) => {
      state.loadingCheckLogin = false;
    });

    /**
     * register
     */
    builder.addCase(requestRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestRegister.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.loginCode === TTCSconfig.STATUS_SUCCESS)
          state.userInfo = new UserInfo(action.payload.info);
      }
    );
    builder.addCase(
      requestRegister.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
      }
    );

    /**
     * loginWithGoogle
     */
    builder.addCase(requestLoginWithGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestLoginWithGoogle.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.loginCode === TTCSconfig.STATUS_SUCCESS)
          state.userInfo = new UserInfo(action.payload.userInfo);
      }
    );
    builder.addCase(
      requestLoginWithGoogle.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
      }
    );

    /**
     * updateUser
     */
    builder.addCase(requestUpdateUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestUpdateUserInfo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userInfo = new UserInfo(action.payload.userInfo);
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
          state.userInfo = new UserInfo(action.payload.UserInfo);
      }
    );

    builder.addCase(requestUpdateStudiedForUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestUpdateStudiedForUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.userInfo = new UserInfo(action.payload.data);
      }
    );

    // ----forgot pass----
    builder.addCase(requestForgotPassword.pending, (state) => {
      state.loadingForgot = true;
    });
    builder.addCase(
      requestForgotPassword.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingForgot = false;
        state.data = action.payload;
      }
    );
    builder.addCase(requestForgotPassword.rejected, (state) => {
      state.loadingForgot = false;
    });

    // ----check token reset pass----
    builder.addCase(requestCheckTokenExpires.pending, (state) => {
      state.loadingForgot = true;
    });
    builder.addCase(
      requestCheckTokenExpires.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingForgot = false;
        state.data = action.payload;
      }
    );
    builder.addCase(requestCheckTokenExpires.rejected, (state) => {
      state.loadingForgot = false;
    });

    // ----reset pass----
    builder.addCase(requestResetPassword.pending, (state) => {
      state.loadingForgot = true;
    });
    builder.addCase(
      requestResetPassword.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingForgot = false;
        state.data = action.payload;
      }
    );
    builder.addCase(requestResetPassword.rejected, (state) => {
      state.loadingForgot = false;
    });
  },
});

export const authState = (state: RootState) => state.authState;

export const { loadUserInfo, setLoadingCheckLogin } = authSlice.actions;
export default authSlice.reducer;
