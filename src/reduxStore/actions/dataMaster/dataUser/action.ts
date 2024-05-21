import { DataUserInterFace, SearchInterface } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataUserAction,
  DataUserType,
  utilityActions,
} from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";

export const fetchDataUser = (
  users: DataUserInterFace[],
  total: number
): DataUserAction => ({
  type: DataUserType.GET_DATA_USER,
  payload: {
    data: users,
    total: total,
  },
});

export const getDataUser = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
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
      dispatch(fetchDataUser(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(fetchDataUser([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
