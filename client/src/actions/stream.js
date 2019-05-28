import { createRoutine } from "redux-saga-routines";
// import { createAction } from "redux-actions";

import { GET_STREAMS } from "../constants/actionTypes";

export const getStreams = createRoutine(GET_STREAMS);
