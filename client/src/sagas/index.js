import { all, fork } from "redux-saga/effects";

import streams from "./streams";

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(streams)]);
}
