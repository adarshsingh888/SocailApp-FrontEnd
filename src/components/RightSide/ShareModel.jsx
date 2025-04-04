import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import PostShare from '../PostSide/PostShear';
function ShareModel({modelOpened,setModelOpened}) {
  

  return (
    <>
      <Modal
       opened={modelOpened} 
       onClose={()=> setModelOpened(false)}
       title="Create new Post"
       size={'lg'}>
        {/* Modal content */}
        <PostShare/>
      </Modal>

    
    </>
  );
}
export default ShareModel;