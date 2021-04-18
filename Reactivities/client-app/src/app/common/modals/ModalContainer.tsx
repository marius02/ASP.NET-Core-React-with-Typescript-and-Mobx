import React from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();

  return (
    <Modal open={modalStore.modal.open} onClose={modalStore.closeModal}>
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
});
