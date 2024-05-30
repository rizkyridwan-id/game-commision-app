import { SinkronDataPegawaiInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  getData,
  postData,
  today,
  urlApi,
} from "@/utils";

export const sinkronDataRedux = () => {
  const cariData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const formValues = getState().form?.FormSinkronDataPegawai
          .values as SinkronDataPegawaiInterFace;

        const data = {
          kode_pegawai: formValues.kode_pegawai,
          kode_toko: formValues.kode_toko,
          periode: today.slice(0, 7),
        };
        dispatch(utilityActions.setLoading({ screen: true }));
        const response = await getData<SinkronDataPegawaiInterFace[]>(
          urlApi.externalApi.omzetSales,
          data
        );
        const newData = response.data.map((list) => {
          return {
            ...list,
            kode_toko: formValues.kode_toko,
          };
        });
        dispatch(simpanDataTmp({ data: newData }));
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };

  const sinkronData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const dataTmp = state.utility.getDataTmp
        .data as unknown as SinkronDataPegawaiInterFace[];

      //   console.log(dataTmp);
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData(urlApi.transaksi.omzetSales, {
          detail_omzet: dataTmp.map((list) => {
            return {
              kode_toko: list.kode_toko,
              omzet_jual_faktur: list.omzet_jual_faktur,
              omzet_jual_berat: list.omzet_jual_berat,
              omzet_jual_rupiah: list.omzet_jual_rupiah,
              periode: today.slice(0, 7),
              kode_pegawai: list.kode_pegawai,
            };
          }),
        });
        dispatch(simpanDataTmp({ data: [] }));
        dispatch(utilityActions.stopLoading());
        NotifSuccess("Sinkronisasi Berhasil");
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };

  return {
    cariData,
    sinkronData,
  };
};
