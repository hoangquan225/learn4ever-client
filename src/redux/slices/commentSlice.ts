import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiLoadComments, apiUpdateComment } from "../../api/comment";
import TTCSconfig from "../../submodule/common/config";
import { Comment } from "../../submodule/models/comment";
import { RootState } from "../store";

interface CommentState {
    comments: Comment[],
    loading: boolean,
    loadingUpdate: boolean,
    commentInfo: Comment | null
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    loadingUpdate: false,
    commentInfo: null
}

export const requestUpdateComment = createAsyncThunk(
    "comment/updateComment",
    async (props: Comment) => {
        const res = await apiUpdateComment(props);
        return res.data;
    }
);
export const requestLoadComments = createAsyncThunk(
    "comment/requestLoadComments",
    async (props: { idTopic: string }) => {
        const res = await apiLoadComments(props);
        return res.data;
    }
);

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // load
        builder.addCase(requestLoadComments.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadComments.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(requestLoadComments.fulfilled, (state, action: PayloadAction<{
            data: Comment[];
            status: number;
        }>) => {
            state.loading = false;
            state.comments = action.payload.data
        })

        // update
        builder.addCase(requestUpdateComment.pending, (state) => {
            state.loadingUpdate = true;
        })
        builder.addCase(requestUpdateComment.rejected, (state) => {
            state.loadingUpdate = false;
        })

        builder.addCase(requestUpdateComment.fulfilled, (state, action: PayloadAction<{
            data: Comment;
            status: number;
        }>) => {
            // if(action.payload.status === TTCSconfig.STATUS_SUCCESS) {
            //     const data = action.payload.data
            //     const comments = [...state.comments]
            //     const indexData = comments.findIndex(comment => comment.id === data.id)
            //     if(indexData !== -1) {
            //         // update 
            //         comments.splice(indexData, 1, data)
            //         state.comments === comments
            //     } else { 
            //         // create

            //     }
            // }
            state.loadingUpdate = false
        })
    }
});

export const { } = commentSlice.actions;

export const commentState = (state: RootState) => state.comment

export default commentSlice.reducer