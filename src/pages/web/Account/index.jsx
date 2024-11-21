import { useState } from 'react';
import Footer from '../../../component/Footer/Footer';
import Header from '../../../component/Header';

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

export const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Header />
      <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}>A</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography variant="subtitle1">{profile.email}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Thông tin cá nhân
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {['name', 'email', 'phone', 'address'].map(field => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
            ))}
          </Grid>
          {isEditing ? (
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Lưu
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ marginTop: 2 }}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </Button>
          )}
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};
