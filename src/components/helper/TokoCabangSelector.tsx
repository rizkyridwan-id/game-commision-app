import { useEffect } from "react";
import { Field } from "redux-form";
import { RenderSelect, isPusat } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, actionMaster, useAppSelector } from "@/reduxStore";

interface Props {
  className: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
const TokoCabangSelector = (props: Props) => {
  const { className, disabled, onChange } = props;
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
          disabled={disabled}
          onChange={onChange}
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
