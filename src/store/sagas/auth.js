import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], "token")
  yield call([localStorage, 'removeItem'], "expirationDate")
  yield call([localStorage, 'removeItem'], "userId")
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("expirationDate");
  // yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationDate * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const requestData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVGT2kOhlMGcxNH-Ruw4WhbSCbyyYaLcc";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVGT2kOhlMGcxNH-Ruw4WhbSCbyyYaLcc";
  }

  try {
    const response = yield axios.post(url, requestData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}
export function* authCheckStateSage(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
      yield put(actions.logout())
    } else {
      const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
      const userId = yield localStorage.getItem("userId");
      if (expirationDate > new Date()) {
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
      } else {
        yield put(actions.logout());
      }
    }
}