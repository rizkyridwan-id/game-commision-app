import { useState } from "react";
import { Field, change } from "redux-form";
import { ReanderField } from "@/utils";
import { ModalLocal } from "../modal";
import { TableDataPegawai } from "@/pages";
import { PegawaiInterface } from "@/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reduxStore";

interface Props {
  className?: string;
  namaForm: string;
  onClick?: (e: PegawaiInterface[]) => void;
  //   onChange?: (e: TypeInputOnChangeValue) => void | undefined;
}
const KodePegawaiSelector = (props: Props) => {
  const { className, namaForm, onClick } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = useState(false);

  const setValue = (value: PegawaiInterface[]) => {
    dispatch(change(namaForm, "kode_pegawai", value[0].kode_pegawai));
    if (onClick) {
      onClick(value);
    }
    setModal(false);
  };

  return (
    <div className={className}>
      <Field
        label="Kode Pegawai"
        name="kode_pegawai"
        id="kode_pegawao_selector"
        type="text"
        // onChange={(e: TypeInputOnChangeValue) => onChange(e)}
        placeholder="Masukan Kode Pegawai"
        component={ReanderField}
        right
        inputGroup
        handleClick={() => setModal(true)}
        textIconGroup={
          <>
            <i className="fa fa-search"> </i>{" "}
          </>
        }
      />
      <ModalLocal
        isOpen={modal}
        hideModal={() => setModal(false)}
        namaForm="FormDataMemberGadai"
        title="Cari Data Pegawai"
        width={700}
      >
        <TableDataPegawai
          form="pencarian_pegawai"
          changeKodePegawai={(value) => setValue(value)}
        />
      </ModalLocal>
    </div>
  );
};

export default KodePegawaiSelector;
