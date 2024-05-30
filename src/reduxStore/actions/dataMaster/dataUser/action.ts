import { DataUserInterFace, SearchInterface } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataUserAction,
  DataUserType,
  utilityActions,
} from "../../../index";
import { NotifInfo, VITE_APP_KODE_TOKO, getData, urlApi } from "@/utils";

export const fetchDataUser = (
  data: DataUserInterFace[],
  total: number
): DataUserAction => ({
  type: DataUserType.GET_DATA_USER,
  payload: {
    data: data,
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

      params.kode_toko = `${VITE_APP_KODE_TOKO}`;

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
