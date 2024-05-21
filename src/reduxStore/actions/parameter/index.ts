import { getParameterBonusSales } from "./parameterBonusSales";
import { getParameterTargetSales } from "./parameterTargetSales";
import { getParameterTargetToko } from "./parameterTargetToko";

const actionParameter = {
  getParameterBonusSales,
  getParameterTargetSales,
  getParameterTargetToko,
};

export { actionParameter };

export * from "./parameterBonusSales";
export * from "./parameterTargetSales";
export * from "./parameterTargetToko";
