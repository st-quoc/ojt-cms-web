import React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppBarStyled = styled(AppBar)({
  position: 'relative',
});

const Layout = styled('main')(({ theme }) => ({
  width: 'auto',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
  },
}));

const StepperStyled = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0, 5),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarStyled color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <Layout>
        <PaperStyled>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <StepperStyled activeStep={activeStep}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </StepperStyled>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <ButtonStyled onClick={handleBack}>Back</ButtonStyled>
                )}
                <ButtonStyled
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </ButtonStyled>
              </Box>
            </React.Fragment>
          )}
        </PaperStyled>
        <Copyright />
      </Layout>
    </React.Fragment>
  );
}
