import { createRoutine } from "redux-saga-routines";

import { GET_STREAMS, GET_STREAM, UPDATE_STREAM } from "../constants/actionTypes";

export const getStreams = createRoutine(GET_STREAMS);
export const updateStream = createRoutine(UPDATE_STREAM);
export const getStreamBySlug = createRoutine(GET_STREAM);
