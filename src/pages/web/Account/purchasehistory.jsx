import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';

export const PurchaseHistory = () => {
  const purchaseData = [
    { id: 1, product: 'Nike Airforce 1', date: '2024-10-01', amount: '200€' },
    { id: 2, product: 'Nike Hunter', date: '2024-08-15', amount: '122$' },
    { id: 3, product: 'Bitis Hunter', date: '2024-07-10', amount: '100$' },
  ];

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Lịch sử mua hàng</Typography>
        <Divider sx={{ marginY: 2 }} />
        {purchaseData.map(item => (
          <Grid container spacing={2} key={item.id} sx={{ marginBottom: 1 }}>
            <Grid item xs={8}>
              <Typography>{item.product}</Typography>
              <Typography variant="caption">Ngày: {item.date}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              <Typography>{item.amount}</Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;
