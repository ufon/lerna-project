import { all, fork } from "redux-saga/effects";

import streams from "./streams";
import user from "./user";

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(streams), fork(user)]);
}
