import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CryptoModuleOptions from './cryptoSwitch'
import {CryptoContext} from '../context/cryptoContext';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';



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
            <Card style={{padding: "30px"}}>
              <h2 id="transition-modal-title">Change your Cryptocurrencies (Limit 6)</h2>
              <CryptoModuleOptions/>
            </Card>
          </div>
          
        </Fade>
      </Modal>
    </div>
 );
}

export default TransitionsModal;