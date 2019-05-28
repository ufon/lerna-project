import { createStore, applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import sagas from "../sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [routerMiddleware(history), sagaMiddleware];

// const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
// if (typeof devToolsExtension === "function") {
//   enhancers.push(devToolsExtension());
// }

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

const app = combineReducers({
  app: rootReducer,
  router: connectRouter(history)
});

const store = createStore(app, composedEnhancers);

sagaMiddleware.run(sagas);

export default store;
