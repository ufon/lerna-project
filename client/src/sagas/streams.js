import { takeLatest, call, put } from "redux-saga/effects";
import { getStreams, getStreamBySlug } from "../actions/stream";
import StreamService from "../services/stream.service";

export function* getStreamsRequest() {
  try {
    const { data } = yield call(StreamService.getStreams);
    yield put({
      type: getStreams.SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: getStreams.FAILURE,
      payload: error
    });
  }
}

export function* getStreamRequest({ payload }) {
  try {
    const { data } = yield call(StreamService.getStream, payload);
    yield put({
      type: getStreamBySlug.SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: getStreamBySlug.FAILURE,
      payload: error
    });
  }
}

export default function* streamsSagas() {
  yield takeLatest(getStreams.REQUEST, getStreamsRequest);
  yield takeLatest(getStreamBySlug.REQUEST, getStreamRequest);
}
