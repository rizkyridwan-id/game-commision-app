import { Button, Popconfirm } from "antd";
import { useAppSelector } from "../../reduxStore";
import { useState } from "react";

interface Props {
  prosesDelete: () => void;
  disabled?: boolean;
}

const ButtonDelete = (props: Props) => {
  const utility = useAppSelector((state) => state.utility);
  const [open, setOpen] = useState(false);

  return (
    <Popconfirm
      title="Konfirmasi Hapus Data ! "
      description="Yakin Ingin Menghapus Data Ini ?"
      open={open}
      onConfirm={() => props.prosesDelete()}
      okButtonProps={{ loading: utility.getLoading.button }}
      onCancel={() => setOpen(false)}
    >
      <Button
        disabled={props.disabled}
        type="primary"
        danger
        onClick={() => setOpen(true)}
      >
        <i className="fa fa-trash"></i>
      </Button>
    </Popconfirm>
  );
};

export default ButtonDelete;
