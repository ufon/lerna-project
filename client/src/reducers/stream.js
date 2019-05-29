import { handleActions } from "redux-actions";

import { getStreams } from "../actions/stream";

export const initialState = {
  loading: true,
  success: undefined,
  errorMessage: "",
  data: []
};

const getStreamsRequest = state => ({
  ...state,
  loading: true,
  success: undefined,
  errorMessage: ""
});
const getStreamsSuccess = (state, { payload }) => ({
  ...state,
  loading: false,
  success: true,
  errorMessage: "",
  data: payload
});

const streamReducer = handleActions(
  {
    [getStreams.REQUEST]: getStreamsRequest,
    [getStreams.SUCCESS]: getStreamsSuccess
  },
  initialState
);

export default streamReducer;
