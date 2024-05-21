import { DataJabatanInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { DataJabataAction, DataJabatanType } from "./type";

export const getDataJabataAction = (
  users: DataJabatanInterFace[],
  total: number
): DataJabataAction => ({
  type: DataJabatanType.GET_DATA_JABATAN,
  payload: {
    data: users,
    total: total,
  },
});

export const getDataJabatan = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<DataJabatanInterFace[]>(
        urlApi.dataMaster.user,
        params
      );
      dispatch(getDataJabataAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getDataJabataAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
