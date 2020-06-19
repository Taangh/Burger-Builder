import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSage} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import {purchaseBurger, fetchOrdersSage} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSage)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurger)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSage)
}