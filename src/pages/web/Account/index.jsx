import { useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Footer from '../../../component/Footer/Footer';
import Header from '../../../component/Header';
import Profile from './profile';
import PurchaseHistory from './purchaseHistory';
import Notifications from './notifications';

export const Account = () => {
  const [selectedSection, setSelectedSection] = useState('profile');

  return (
    <>
      <Header />
      <Grid container>
        <Grid item>
          <List
            component="nav"
            sx={{
              width: '250px',
              backgroundColor: '#f5f5f5',
              padding: 1,
              height: '100vh',
            }}
          >
            <ListItem
              button
              selected={selectedSection === 'profile'}
              onClick={() => setSelectedSection('profile')}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Thông tin cá nhân" />
            </ListItem>
            <ListItem
              button
              selected={selectedSection === 'history'}
              onClick={() => setSelectedSection('history')}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Lịch sử mua hàng" />
            </ListItem>
            <ListItem
              button
              selected={selectedSection === 'notifications'}
              onClick={() => setSelectedSection('notifications')}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Thông báo" />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs>
          {selectedSection === 'profile' && <Profile />}
          {selectedSection === 'history' && <PurchaseHistory />}
          {selectedSection === 'notifications' && <Notifications />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Account;
