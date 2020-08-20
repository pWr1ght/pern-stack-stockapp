import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CryptoModuleOptions from './cryptoModalOptions'
import {CryptoContext} from '../../../context/cryptoContext';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { Container } from '@material-ui/core';
import {createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.button = {
  fontSize: '.5rem',
  '@media (min-width:600px)': {
    fontSize: '.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TransitionsModal = () => {
  const classes = useStyles();
  const [openModal, setOpen] = React.useState(false);
  const {currentCrypto, setCryto} = useContext(CryptoContext)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button style={{color: "white"}} variant="outlined" onClick={handleOpen}>
        Edit CryptoBar
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Container>
            <ThemeProvider theme={theme}>
      
              <Card style={{padding: "30px"}}>
              <Typography variant="h3">Change your Cryptocurrencies (Limit 6)</Typography>
                {/* <h2 id="transition-modal-title">Change your Cryptocurrencies (Limit 6)</h2> */}
                <CryptoModuleOptions/>
              </Card>
              </ThemeProvider>
            </Container>
          </div>
          
        </Fade>
      </Modal>
    </div>
 );
}

export default TransitionsModal;