import {
  AppDispatch,
  AppThunk,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  VITE_APP_KODE_TOKO,
  convertDate,
  getData,
  isPusat,
  postData,
  timeout,
  today,
  urlApi,
} from "@/utils";
import { FormPayrollInterFace, GetPayrollPegawaiSummaryDtoProps } from "../dto";
import { change, reset } from "redux-form";
import { cetakSlipGajih } from "../pdf";

export const payrolRedux = () => {
  const saveData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      await timeout(100);
      const state = getState();
      const formData = state?.form.FormPayroll?.values as FormPayrollInterFace;
      const feedBackData = state.utility.getDataTmp
        .data as unknown as GetPayrollPegawaiSummaryDtoProps;

      const newData = {
        ...formData,
        gajih_pokok: feedBackData.gaji_pokok,
        tgl_lahir: `${convertDate(`${feedBackData.tgl_lahir}`, true)}`,
      };

      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData(urlApi.transaksi.payroll, {
          kode_toko: VITE_APP_KODE_TOKO,
          kode_pegawai: formData.kode_pegawai,
          periode: today.slice(0, 7),
          bonus_target: formData.bonus_sales,
          bonus_absen: formData.bonus_absen,
          bonus_jabatan: formData.bonus_jabatan,
          kasbon: feedBackData.potongan.kasbon,
          potongan_lain: feedBackData.potongan.potongan_lain,
          grand_total: formData.total_gajih,
        });
        cetakSlipGajih(newData);
        dispatch(utilityActions.stopLoading());
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(reset("FormPayroll"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const getPayrollSumary = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      await timeout(100);
      const formData = getState()?.form.FormPayroll
        ?.values as FormPayrollInterFace;

      if (isPusat) {
        if (!formData.kode_toko) {
          NotifInfo("Kode Toko Harus Di Pilih");
          return false;
        }
      }

      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        const response = await getData<GetPayrollPegawaiSummaryDtoProps>(
          urlApi.transaksi.payrollSummary,
          {
            kode_pegawai: formData.kode_pegawai,
            periode: today.slice(0, 7),
            kode_toko: formData.kode_toko || `${VITE_APP_KODE_TOKO}`,
          }
        );

        if (response.data) {
          dispatch(
            simpanDataTmp({
              data: response.data,
            })
          );
          dispatch(change("FormPayroll", "jabatan", response.data.jabatan));
          dispatch(
            change("FormPayroll", "nama_pegawai", response.data.nama_pegawai)
          );
          dispatch(
            change(
              "FormPayroll",
              "gaji_pokok",
              Number(response.data.gaji_pokok)
            )
          );
          dispatch(
            change(
              "FormPayroll",
              "bonus_sales",
              Number(response.data.bonus_sales)
            )
          );
          dispatch(
            change(
              "FormPayroll",
              "potongan",
              response.data.potongan.kasbon +
                response.data.potongan.potongan_lain
            )
          );

          dispatch(hitungGajih());
          dispatch(utilityActions.stopLoading());
        }
      } catch (error) {
        console.log(error);
        dispatch(change("FormPayroll", "jabatan", ""));
        dispatch(change("FormPayroll", "nama_pegawai", ""));
        dispatch(change("FormPayroll", "gaji_pokok", "s"));
        dispatch(change("FormPayroll", "bonus_sales", ""));
        dispatch(change("FormPayroll", "potongan", ""));
        dispatch(change("FormPayroll", "total_gajih", ""));

        dispatch(
          simpanDataTmp({
            data: [],
          })
        );
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };

  const hitungGajih = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      //   console.log("MASUk");
      await timeout(100);
      const state = getState();
      const formData = state?.form.FormPayroll?.values as FormPayrollInterFace;

      const feedBackData = state.utility.getDataTmp
        .data as unknown as GetPayrollPegawaiSummaryDtoProps;

      const totalGajih =
        feedBackData.gaji_pokok +
        feedBackData.tunjangan_jabatan +
        feedBackData.bonus_sales +
        Number(formData.bonus_absen || 0) +
        Number(formData.bonus_jabatan || 0) -
        feedBackData.potongan.kasbon -
        feedBackData.potongan.potongan_lain;

      dispatch(change("FormPayroll", "total_gajih", totalGajih));
    };
  };
  return {
    getPayrollSumary,
    hitungGajih,
    saveData,
  };
};
