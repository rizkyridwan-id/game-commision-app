import { Popconfirm, Tooltip } from "antd";
import { useAppSelector } from "../../reduxStore";
import { useState } from "react";
import { ButtonCustom } from "./Button";

interface Props {
  prosesDelete: () => void;
  disabled?: boolean;
  tooltipText?: string;
}

const ButtonDelete = (props: Props) => {
  const utility = useAppSelector((state) => state.utility);
  const [open, setOpen] = useState(false);

  return (
    <Tooltip title={props.tooltipText}>
      <span>
        <Popconfirm
          title="Konfirmasi Hapus Data ! "
          description="Yakin Ingin Menghapus Data Ini ?"
          open={open}
          onConfirm={() => props.prosesDelete()}
          okButtonProps={{ loading: utility.getLoading.button }}
          onCancel={() => setOpen(false)}
        >
          <ButtonCustom
            disabled={props.disabled}
            color="red"
            onClick={() => setOpen(true)}
          >
            <i className="fa fa-trash"></i>
          </ButtonCustom>
        </Popconfirm>
      </span>
    </Tooltip>
  );
};

export default ButtonDelete;
