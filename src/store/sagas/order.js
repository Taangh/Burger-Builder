import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurger(action) {
  const response = yield put(actions.purchaseBurgerStart());
  try {
    yield axios.post("/orders.json?auth=" + action.token, action.orderData); //This is only for firebase -> .json on the end of endpoint
    yield put(actions.purchaseBurgerSucess(response.data, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSage(action) {
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(action.fetchOrdersFail(error));
  }
}
