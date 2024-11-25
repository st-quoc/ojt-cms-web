import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ModalCreateSize = ({ open, onClose, onCreate }) => {
  const [sizeName, setSizeName] = useState('');

  const handleCreate = () => {
    if (sizeName.trim()) {
      onCreate(sizeName.trim());
      setSizeName('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New Size
        </Typography>
        <TextField
          label="Size Name"
          value={sizeName}
          onChange={e => setSizeName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreate}
        >
          Create Size
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCreateSize;
