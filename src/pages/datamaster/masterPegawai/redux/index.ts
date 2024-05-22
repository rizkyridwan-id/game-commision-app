import { DataSalesInterFace, PegawaiInterface } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionMaster,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  deleteData,
  getData,
  postData,
  putData,
  timeout,
  urlApi,
} from "@/utils";
import { reset } from "redux-form";

export const dataPegawaiRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormPegawai?.values as PegawaiInterface;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: PegawaiInterface) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<PegawaiInterface>(urlApi.dataMaster.pegawai, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionMaster.getDataPegawai());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPegawai"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: PegawaiInterface) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<PegawaiInterface>(
          `${urlApi.dataMaster.pegawai}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionMaster.getDataPegawai());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormPegawai"));
        dispatch(utilityActions.hideModal());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };

  const removeData = (id: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(
          utilityActions.setLoading({
            button: true,
          })
        );
        await deleteData<PegawaiInterface>(
          `${urlApi.dataMaster.pegawai}/${id}`
        );
        dispatch(actionMaster.getDataPegawai());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Hapus"}`);
      }
    };
  };

  const cariDataSales = (): AppThunk => {
    return async (dispatch, getState) => {
      await timeout();
      const state = getState();
      const formValue = state.form.FormPegawai?.values as PegawaiInterface;
      // console.log(formValue);

      if (formValue?.kode_toko) {
        try {
          dispatch(utilityActions.setLoading({ screen: true }));
          const result = await getData<DataSalesInterFace[]>(
            urlApi.externalApi.dataSales,
            {
              kode_toko: formValue?.kode_toko,
            }
          );
          dispatch(
            utilityActions.simpanDataTmp<DataSalesInterFace[]>({
              data: result.data as DataSalesInterFace[],
            })
          );
          dispatch(utilityActions.stopLoading());
        } catch (error) {
          dispatch(utilityActions.stopLoading());
          NotifInfo(`${error}`);
          dispatch(
            utilityActions.simpanDataTmp({
              data: [],
            })
          );
        }
      } else {
        dispatch(
          utilityActions.simpanDataTmp({
            data: [],
          })
        );
      }
    };
  };

  return {
    prosesData,
    removeData,
    cariDataSales,
  };
};
