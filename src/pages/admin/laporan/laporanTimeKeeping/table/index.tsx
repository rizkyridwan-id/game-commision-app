import { TableMaster } from "@/components";
import { IReportTimeKeeping } from "@/interface";
import {
  AppDispatch,
  RootState,
  simpanDataTmp,
  useAppSelector,
} from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxLaporanTimeKeeping } from "../redux";
import {
  columnsTableBreak,
  columnsTableIstirahat,
  columnsTableKehadiran,
  columnsTableSholat,
} from "../report/column";
import {
  ConfigProps,
  InjectedFormProps,
  getFormValues,
  reduxForm,
} from "redux-form";
import { LaporanTimeKeepingDto } from "../dto";

type FormProps = {
  getForm: LaporanTimeKeepingDto; // Add the type for getForm
};

const TableLaporanTimeKeeping = (
  props: InjectedFormProps<LaporanTimeKeepingDto, FormProps, string> & FormProps
) => {
  const { getForm } = props;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);

  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as IReportTimeKeeping[];

  const proses = reduxLaporanTimeKeeping();
  const typeTimeKeeping = getForm?.type_time_keeping;
  return (
    <div className="row mt-4">
      <div className="col-12">
        <TableMaster
          dataSource={datatmp || []}
          columns={
            typeTimeKeeping === "KEHADIRAN"
              ? columnsTableKehadiran
              : typeTimeKeeping === "ISTIRAHAT"
                ? columnsTableIstirahat
                : typeTimeKeeping === "BREAK"
                  ? columnsTableBreak
                  : columnsTableSholat
          }
          rowKey={"_id"}
        />
      </div>
      {datatmp?.length !== 0 && (
        <>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="warning"
              onClick={() => dispatch(proses.exportLaporan("PDF"))}
              block
            >
              Export Pdf
            </ButtonCustom>
          </div>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="success"
              block
              onClick={() => dispatch(proses.exportLaporan("EXCEL"))}
            >
              Export Excel
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

const mapState = (state: RootState<LaporanTimeKeepingDto>) => {
  return {
    getForm: getFormValues("LaporanTimeKeeping")(
      state
    ) as LaporanTimeKeepingDto,
  };
};

const connector = connect(mapState);
const config: ConfigProps<LaporanTimeKeepingDto, FormProps> = {
  form: "TableLaporanTimeKeeping",
  enableReinitialize: true,
};

export default connector(
  reduxForm<LaporanTimeKeepingDto, FormProps>(config)(TableLaporanTimeKeeping)
);
