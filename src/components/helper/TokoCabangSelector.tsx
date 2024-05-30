import { useEffect } from "react";
import { Field } from "redux-form";
import { RenderSelect, isPusat } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, actionMaster, useAppSelector } from "@/reduxStore";

interface Props {
  className: string;
}
const TokoCabangSelector = (props: Props) => {
  const { className } = props;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);
  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

  if (isPusat) {
    return (
      <div className={className}>
        <Field
          label="Kode Toko"
          name="kode_toko"
          component={RenderSelect}
          placeholder="Pilih Kode Toko"
          options={dataToko.data.map((list) => {
            return {
              value: list.kode_toko,
              label: list.kode_toko,
            };
          })}
        />
      </div>
    );
  }
};

export default TokoCabangSelector;
