import { DataUserInterFace, SearchInterface } from "@/interface";
import { UserAction, UserActionTypes } from ".";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";

export const fetchUsersRequest = (): UserAction => ({
  type: UserActionTypes.FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (
  users: DataUserInterFace[],
  total: number
): UserAction => ({
  type: UserActionTypes.FETCH_USERS_SUCCESS,
  payload: {
    data: users,
    total: total,
  },
});

export const fetchUsersFailure = (error: string): UserAction => ({
  type: UserActionTypes.FETCH_USERS_FAILURE,
  error,
});

export const getDataUser = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      if (row?.q !== undefined) {
        params.q = row.q || "";
      }

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<DataUserInterFace[]>(
        urlApi.dataMaster.user,
        params
      );
      dispatch(fetchUsersSuccess(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(fetchUsersSuccess([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
