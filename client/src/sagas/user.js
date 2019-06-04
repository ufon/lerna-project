import { takeLatest, call, put } from "redux-saga/effects";
import { login, register, getProfile, updateProfile } from "../actions/auth";
import UserService from "../services/user.service";
import tokenHelpers from "../helpers/tokenHelpers";

export function* loginRequest(data) {
  try {
    const {
      data: { accessToken },
    } = yield call(UserService.login, { ...data.payload });
    yield call(tokenHelpers.delete);
    yield call(tokenHelpers.write, accessToken);
    yield put({
      type: login.SUCCESS,
      payload: accessToken,
    });
    yield profileRequest();
  } catch (error) {
    yield put({
      type: login.FAILURE,
      payload: error.response.data,
    });
  }
}

export function* registerRequest(data) {
  try {
    yield call(UserService.register, { ...data.payload });
    yield put({
      type: register.SUCCESS,
    });
  } catch (error) {
    yield put({
      type: register.FAILURE,
      payload: error.response.data,
    });
  }
}

export function* profileRequest() {
  try {
    const { data } = yield call(UserService.getProfile);
    yield put({
      type: getProfile.SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: getProfile.FAILURE,
      payload: error,
    });
  }
}

export function* profileUpdateRequest({ payload }) {
  try {
    const { data } = yield call(UserService.updateProfile, { ...payload });
    yield put({
      type: updateProfile.SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: updateProfile.FAILURE,
      payload: error,
    });
  }
}

export default function* authSagas() {
  yield takeLatest(login.REQUEST, loginRequest);
  yield takeLatest(register.REQUEST, registerRequest);
  yield takeLatest(getProfile.REQUEST, profileRequest);
  yield takeLatest(updateProfile.REQUEST, profileUpdateRequest);
}
