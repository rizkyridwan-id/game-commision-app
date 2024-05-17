import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import {
  AppActionUtility,
  RootState,
  UtilityState,
  utilityActions,
} from "@/reduxStore";
import { ThunkDispatch } from "redux-thunk";
import { ModalGlobalInterFace } from "@/interface";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalGlobal: React.FC<ModalGlobalInterFace> = (props) => {
  const { children, title, namaForm } = props;
  const utility = useSelector<RootState<string>, UtilityState<string>>(
    (state) => state.utility
  );
  const dispatch =
    useDispatch<
      ThunkDispatch<RootState<string>, null, AppActionUtility<string>>
    >();

  const handleCancel = () => {
    dispatch(reset(`${namaForm}`));

    dispatch(
      utilityActions.showModal({
        isModalShow: false,
        isEdit: false,
        data: [],
        namaForm: "",
      })
    );
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      id={props.id}
      isOpen={utility.getModal.isModalShow}
      toggle={() => handleCancel()}
      style={{
        maxWidth: props.width,
        width: "100%",
      }}
    >
      <ModalHeader toggle={() => handleCancel()}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalGlobal;
