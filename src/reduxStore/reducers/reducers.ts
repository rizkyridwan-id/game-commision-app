import { createStore, combineReducers, Action } from "redux";
import { reducer as formReducer } from "redux-form";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import utilityReducer from "./reducerUtility";
import themeReducer from "./reducerTheme";
import RootAction, { RootState } from "../action";

export const rootReducer = combineReducers({
  form: formReducer,
  utility: utilityReducer,
  theme: themeReducer,
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

// export const useAppSelector: <T>() => TypedUseSelectorHook<RootState<T>> = () =>
//   useSelector;

export default store;
