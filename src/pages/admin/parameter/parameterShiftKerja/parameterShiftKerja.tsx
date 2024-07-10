import { FormOtorisasi, ModalGlobal, PanelContent } from "@/components";
import TableParameterShiftKerja from "./table";
import FormShiftKerja from "./form";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import { useDispatch } from "react-redux";
import { parameterShiftKerjaRedux } from "./redux";

const ParameterShiftKerja = () => {
  const utility = useAppSelector((state) => state.utility);
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterShiftKerjaRedux();

  return (
    <PanelContent title="Parameter Shift Kerja">
      <TableParameterShiftKerja />
      <ModalGlobal
        namaForm="FormTargetSales"
        title={`${utility.getModal.title}`}
        width={500}
      >
        {utility.getModal.title === "Otorisasi" ? (
          <FormOtorisasi onPress={(value) => dispatch(proses.cekUser(value))} />
        ) : (
          <FormShiftKerja />
        )}
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterShiftKerja;
