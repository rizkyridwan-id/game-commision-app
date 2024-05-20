import { DataUserInterFace } from "@/interface";

export enum UserActionTypes {
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
}

export interface FetchUsersRequestAction {
  type: UserActionTypes.FETCH_USERS_REQUEST;
}

export interface FetchUsersSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: {
    data: DataUserInterFace[];
    total: number;
  };
}

export interface FetchUsersFailureAction {
  type: UserActionTypes.FETCH_USERS_FAILURE;
  error: string;
}
export interface DataUserState {
  data: DataUserInterFace[];
  loading: boolean;
  total?: number;
  error: string | null;
}

export type UserAction =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction;
