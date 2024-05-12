import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  apiLoadChats,
  apiSendReactionChat,
  apiUpdateChat,
} from "../../api/chat";
import TTCSconfig from "../../submodule/common/config";
import { RootState } from "../store";
import { Message } from "../../submodule/models/message";

interface ChatState {
  chats: Message[];
  loading: boolean;
  loadingUpdate: boolean;
  chatInfo: Message | null;
  total: number;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  loadingUpdate: false,
  chatInfo: null,
  total: 0,
};

export const requestUpdateChat = createAsyncThunk(
  "chat/updateChat",
  async (props: Message) => {
    const res = await apiUpdateChat(props);
    return res.data;
  }
);

export const requestSendReactionChat = createAsyncThunk(
  "chat/requestSendReactionChat",
  async (props: { idChat: string; idUser: string; type: number }) => {
    const res = await apiSendReactionChat(props);
    return res.data;
  }
);

export const requestLoadChats = createAsyncThunk(
  "chat/requestLoadChats",
  async (props: {
    userIdSend: string,
    userIdReceive: string,
    roomId: string;
    limit?: number;
    skip?: number;
  }) => {
    const res = await apiLoadChats(props);
    return res.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChatSocket: (state, action: PayloadAction<Message>) => {
      const data = action.payload;
      const chats = [...state.chats];
      const indexData = chats.findIndex((chat) => chat.id === data.id);
      if (indexData !== -1) {
        // update
        chats.splice(indexData, 1, data);
        state.chats = chats;
      } else {
        // create
        state.chats = [...chats, data];
        state.total++;
      }
    },
    deleteChatSoket: (
      state,
      action: PayloadAction<{ id: string; idTopic: string }>
    ) => {
      const chats = [...state.chats];
      state.chats = chats.filter(
        (chat) => chat.id !== action.payload.id
      );
    },

    setChats: (state, action) => {
      const data = action.payload;
      state.chats = [...state.chats, ...data];
    },
  },
  extraReducers: (builder) => {
    // load
    builder.addCase(requestLoadChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestLoadChats.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      requestLoadChats.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: Message[];
          total: number;
          status: number;
        }>
      ) => {
        state.loading = false;
        state.chats = action.payload.data;
        state.total = action.payload.total;
      }
    );

    // // update
    // builder.addCase(requestUpdateChat.pending, (state) => {
    //   state.loadingUpdate = true;
    // });
    // builder.addCase(requestUpdateChat.rejected, (state) => {
    //   state.loadingUpdate = false;
    // });

    // builder.addCase(
    //   requestUpdateChat.fulfilled,
    //   (
    //     state,
    //     action: PayloadAction<{
    //       data: Chat;
    //       status: number;
    //     }>
    //   ) => {
    //     state.loadingUpdate = false;
    //   }
    // );

    // // update
    // builder.addCase(requestSendReactionChat.pending, (state) => {
    //   state.loadingUpdate = true;
    // });
    // builder.addCase(requestSendReactionChat.rejected, (state) => {
    //   state.loadingUpdate = false;
    // });
    // builder.addCase(requestSendReactionChat.fulfilled, (state) => {
    //   state.loadingUpdate = false;
    // });
  },
});

export const { updateChatSocket, setChats, deleteChatSoket } =
  chatSlice.actions;

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
