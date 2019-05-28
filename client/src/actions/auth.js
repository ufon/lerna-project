import { createRoutine } from "redux-saga-routines";
import { createAction } from "redux-actions";

import { LOGIN, SIGNUP, LOGOUT } from "../constants/actionTypes";

export const login = createRoutine(LOGIN);
export const logout = createAction(LOGOUT);
export const signUp = createRoutine(SIGNUP);
