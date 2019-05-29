import { handleActions } from "redux-actions";

import { login, register, getProfile } from "../actions/auth";

import tokenHelpers from "../helpers/tokenHelpers";

// setup token from localstorage

const token = tokenHelpers.read();

export const initialState = {
  accessToken: token !== null ? token : null,
  isAuthenticated: token !== null,
  user: {
    loading: true,
    success: undefined,
    hasErrors: false,
    data: {},
    errorInfo: ""
  },
  login: {
    loading: true,
    success: undefined,
    hasErrors: false,
    errorInfo: ""
  },
  register: {
    loading: true,
    success: false,
    hasErrors: false,
    errorInfo: ""
  }
};

const loginRequest = state => ({
  ...state,
  login: {
    ...state.login,
    loading: true,
    success: undefined,
    errorMessage: ""
  }
});
const loginSuccess = (state, { payload }) => ({
  ...state,
  accessToken: payload,
  isAuthenticated: true,
  login: {
    ...state.login,
    loading: false,
    success: true,
    errorMessage: ""
  }
});

const registerRequest = state => ({
  ...state,
  register: {
    ...state.register,
    loading: true,
    success: undefined,
    errorMessage: ""
  }
});
const registerSuccess = state => ({
  ...state,
  register: {
    ...state.register,
    loading: false,
    success: true,
    errorMessage: ""
  }
});

const profileRequest = state => ({
  ...state,
  user: {
    ...state.user,
    loading: true,
    success: undefined
  }
});
const profileSuccess = (state, { payload }) => ({
  ...state,
  user: {
    ...state.user,
    loading: false,
    success: true,
    data: payload
  }
});

const authReducer = handleActions(
  {
    [login.REQUEST]: loginRequest,
    [login.SUCCESS]: loginSuccess,
    [register.REQUEST]: registerRequest,
    [register.SUCCESS]: registerSuccess,
    [getProfile.REQUEST]: profileRequest,
    [getProfile.SUCCESS]: profileSuccess
  },
  initialState
);

export default authReducer;
