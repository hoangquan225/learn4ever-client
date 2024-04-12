import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  apiGetTopicProgressForAchievement,
  apiUpsertTopicProgress,
} from "../../api/user";
import TTCSconfig from "../../submodule/common/config";
import { TopicProgress } from "../../submodule/models/topicProgress";

export interface TopicProgressState {
  progressInfo: TopicProgress | null;
  progress: TopicProgress[];
  loading: boolean;
}

const initialState: TopicProgressState = {
  loading: false,
  progressInfo: null,
  progress: []
};

export const requestUpsertTopicProgress = createAsyncThunk(
  "user/requestUpsertTopicProgress",
  async (props: any) => {
    const res = await apiUpsertTopicProgress(props);
    return res.data;
  }
);
export const requestLoadTopicProgressForAchievement = createAsyncThunk(
  "user/requestLoadTopicProgressForAchievement",
  async (props: any) => {
    const res = await apiGetTopicProgressForAchievement(props);
    return res.data;
  }
);

export const topicProgressSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //------progress-----
    builder.addCase(requestUpsertTopicProgress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestUpsertTopicProgress.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: number;
          data: TopicProgress;
        }>
      ) => {
        state.progressInfo = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(requestUpsertTopicProgress.rejected, (state) => {
      state.loading = false;
    });
    //-----get progress for achievement------
    builder.addCase(requestLoadTopicProgressForAchievement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      requestLoadTopicProgressForAchievement.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: number;
          data: TopicProgress[];
        }>
      ) => {
        state.progress = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(requestLoadTopicProgressForAchievement.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const topicProgressState = (state: RootState) => state.topicProgress;

export const { } = topicProgressSlice.actions;
export default topicProgressSlice.reducer;
