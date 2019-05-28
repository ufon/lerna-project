import { takeLatest, call, put } from "redux-saga/effects";
import { getStreams } from "../actions/stream";
import StreamService from "../services/stream.service";

export function* getStreamsRequest() {
  try {
    const response = yield call(StreamService.getStreams);
    yield call(console.log, response);
    yield put({
      type: getStreams.SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: getStreams.FAILURE,
      payload: error
    });
  }
}

export default function* streamsSagas() {
  yield takeLatest(getStreams.REQUEST, getStreamsRequest);
}
