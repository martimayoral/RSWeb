import { put, takeEvery, ForkEffect, call } from 'redux-saga/effects';
import { callApi } from '../api';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from './slice';
import { sha256 } from 'js-sha256';
import Cookies from 'js-cookie';

function* watchLogInRequest(
  action: PayloadAction<{ username: string, password: string }>
): Generator<any, void, any> {
  try {
    const { username, password: passwordRaw } = action.payload
    yield put(authActions.setAuthStatus("auth_pending"))

    const salt = yield call(callApi, 'GET', `/saltMod`,
      {
        "username": username
      })

    // console.log(salt)
    if (salt?.data === -1) {
      yield put(authActions.setAuthStatus("auth_error"))
      return
    }

    const password = sha256(passwordRaw.toString() + salt.data)
    // console.log("password", passwordRaw.toString() + salt.data,password)


    const login = yield call(callApi, 'GET', `/checkCredentialsMod`,
      {
        "username": username,
        "password": password
      })

    // console.log("login", login?.data)
    if (typeof login?.data.token !== "string") {
      yield put(authActions.setAuthStatus("auth_error"))
      return
    }


    Cookies.set("auth", login.data.token)
    yield put(authActions.setAuthStatus("auth_success"))
    yield put(authActions.setAuthToken(login.data.token))
    yield put(authActions.authFromToken())

  } catch (error) {
    console.error("error caught", error)
    yield put(authActions.setAuthStatus("auth_error"))
    // yield put(counterActions.incrementByAmountAsyncFailure());
  }
}

function* watchAuthFromToken(): Generator<any, void, any> {
  try {
    const infoMod = yield call(callApi, 'GET', `/modInfo`)

    const { id, modRange, name } = infoMod?.data

    if (!infoMod?.data?.id) {
      yield put(authActions.setAuthStatus("no_auth"))
      return
    }
    console.log("Log info:", id, modRange, name)


    // console.log("infoMod", infoMod)

    yield put(authActions.setAuthStatus("auth_success"))
    yield put(authActions.setUserId(id))
    yield put(authActions.setUserName(name))
    yield put(authActions.setRange(modRange))


  } catch (e) {
    console.error(e)
    yield put(authActions.setAuthStatus("no_auth"))
  }
}

function* watchAuthSagas(): Generator<ForkEffect, void> {
  yield takeEvery(authActions.logInRequest, watchLogInRequest);
  yield takeEvery(authActions.authFromToken, watchAuthFromToken);
}


const authSagas = watchAuthSagas;

export default authSagas;
