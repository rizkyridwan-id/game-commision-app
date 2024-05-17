import { TableMaster } from "@/components";
import { AppDispatch, utilityController } from "@/reduxStore";
import { ButtonCustom, ButtonDelete } from "@/utils";
import { useDispatch } from "react-redux";

const TabelMasterUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const helperRedux = utilityController();
  const columns = [
    {
      title: "Master User",
      dataIndex: "user",
      key: "user",
    },

    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: () => (
        <div className="text-center">
          <ButtonCustom>
            {" "}
            <i className="fa fa-edit"></i>
          </ButtonCustom>
          &nbsp;
          <ButtonDelete prosesDelete={() => console.log("Masuk")} />
        </div>
      ),
    },
  ];
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={[]}
      columns={columns}
      rowKey={""}
      onAddButtonClick={() => dispatch(helperRedux.showModal("Tambah"))}
    />
  );
};

export default TabelMasterUser;
