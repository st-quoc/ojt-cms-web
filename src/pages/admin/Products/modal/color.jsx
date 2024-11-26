import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ModalCreateColor = ({ open, onClose, onCreate }) => {
  const [colorName, setColorName] = useState('');

  const handleCreate = () => {
    if (colorName.trim()) {
      onCreate(colorName.trim());
      setColorName('');
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
          Create New Color
        </Typography>
        <TextField
          label="Color Name"
          value={colorName}
          onChange={e => setColorName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreate}
        >
          Create Color
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCreateColor;
