import { Card, CardContent, Typography, Divider } from '@mui/material';

export const Notifications = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Thông báo</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography>Chưa có thông báo nào!</Typography>
      </CardContent>
    </Card>
  );
};

export default Notifications;
