import { Modal, Button } from '@mantine/core';

function EditModel({ modelOpen, setModelOpen }) {
  return (
    <>
      <Modal 
        opened={modelOpen} 
        onClose={() => setModelOpen(false)} 
        withCloseButton
      >
        Modal without header, press escape or click on overlay to close
      </Modal>
    </>
  );
}

export default EditModel;
