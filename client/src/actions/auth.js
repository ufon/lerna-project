import { createRoutine } from "redux-saga-routines";
import { createAction } from "redux-actions";

import { LOGIN, SIGNUP, LOGOUT, PROFILE, UPDATE_PROFILE } from "../constants/actionTypes";

export const getProfile = createRoutine(PROFILE);
export const updateProfile = createRoutine(UPDATE_PROFILE);
export const login = createRoutine(LOGIN);
export const logout = createAction(LOGOUT);
export const register = createRoutine(SIGNUP);
