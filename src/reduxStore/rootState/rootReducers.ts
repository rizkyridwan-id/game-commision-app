import {
  legacy_createStore as createStore,
  combineReducers,
  Action,
} from "redux";
import { reducer as formReducer } from "redux-form";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import utilityReducer from "../reducers/reducerUtility";
import themeReducer from "../reducers/reducerTheme";
import RootAction, { RootState } from "./rootAtion";
import dataUserReducer from "../reducers/dataMaster/dataUserReducer";
import reducerHelper from "../reducers/reducerHelper";

export const rootReducer = combineReducers({
  form: formReducer,
  utility: utilityReducer,
  helper: reducerHelper,
  theme: themeReducer,
  dataMaster: combineReducers({
    dataUser: dataUserReducer,
  }),
});
const store = createStore(rootReducer);

export type AppDispatch = ThunkDispatch<RootState<string>, unknown, RootAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState<string>,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
