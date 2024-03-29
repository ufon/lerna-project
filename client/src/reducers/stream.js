import { handleActions } from "redux-actions";

import { getStreams, getStreamBySlug, updateStream } from "../actions/stream";

export const initialState = {
  streamList: {
    loading: true,
    success: undefined,
    errorMessage: "",
    data: [],
  },
  currentStream: {
    loading: true,
    success: undefined,
    errorMessage: "",
    data: {},
  },
};

const getStreamsRequest = state => ({
  ...state,
  streamList: {
    ...state.streamList,
    loading: true,
    success: undefined,
    errorMessage: "",
  },
});
const getStreamsSuccess = (state, { payload }) => ({
  ...state,
  streamList: {
    ...state.streamList,
    loading: false,
    success: true,
    errorMessage: "",
    data: payload,
  },
});

const getStreamRequest = state => ({
  ...state,
  currentStream: {
    ...state.currentStream,
    loading: true,
    success: undefined,
    errorMessage: "",
  },
});
const getStreamSuccess = (state, { payload }) => ({
  ...state,
  currentStream: {
    ...state.currentStream,
    loading: false,
    success: true,
    errorMessage: "",
    data: payload,
  },
});

const updateStreamRequest = state => ({
  ...state,
  currentStream: {
    ...state.currentStream,
    loading: true,
    success: undefined,
    errorMessage: "",
  },
});
const updateStreamSuccess = state => ({
  ...state,
  currentStream: {
    ...state.currentStream,
    loading: false,
    success: true,
    errorMessage: "",
  },
});

const streamReducer = handleActions(
  {
    [getStreams.REQUEST]: getStreamsRequest,
    [getStreams.SUCCESS]: getStreamsSuccess,
    [updateStream.REQUEST]: updateStreamRequest,
    [updateStream.SUCCESS]: updateStreamSuccess,
    [getStreamBySlug.REQUEST]: getStreamRequest,
    [getStreamBySlug.SUCCESS]: getStreamSuccess,
  },
  initialState,
);

export default streamReducer;
