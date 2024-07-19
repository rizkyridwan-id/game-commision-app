import { getParameterBonusSales } from "./parameterBonusSales";
import { getParameterCuti } from "./parameterCuti";
import { getParameterKonversiCuti } from "./parameterKonversiCuti";
import { getParameterLembur } from "./parameterLembur";
import { getParameterShiftKerja } from "./parameterShiftKerja";
import { getParameterTargetSales } from "./parameterTargetSales";
import { getParameterTargetToko } from "./parameterTargetToko";

const actionParameter = {
  getParameterBonusSales,
  getParameterTargetSales,
  getParameterTargetToko,
  getParameterCuti,
  getParameterShiftKerja,
  getParameterKonversiCuti,
  getParameterLembur,
};

export { actionParameter };

export * from "./parameterBonusSales";
export * from "./parameterTargetSales";
export * from "./parameterTargetToko";
export * from "./parameterCuti";
export * from "./parameterShiftKerja";
export * from "./parameterKonversiCuti";
export * from "./parameterLembur";
