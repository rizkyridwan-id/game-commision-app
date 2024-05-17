import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "redux-form";
import { AppActionUtility, RootState } from "@/reduxStore";
import { ThunkDispatch } from "redux-thunk";
import { ModalLocalInterFace } from "@/interface";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalLocal: React.FC<ModalLocalInterFace> = (props) => {
  const { children, title, namaForm, isOpen, hideModal } = props;

  const dispatch =
    useDispatch<
      ThunkDispatch<RootState<string>, null, AppActionUtility<string>>
    >();

  const handleCancel = () => {
    dispatch(reset(`${namaForm}`));
    hideModal();
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      id={props.id}
      isOpen={isOpen}
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
export default ModalLocal;
