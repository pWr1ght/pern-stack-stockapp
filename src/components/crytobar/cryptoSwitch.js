import React, {useState, useEffect, useContext} from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import {CryptoContext} from '../../context/cryptoContext'
import AddIcon from '@material-ui/icons/Add';
import '../../styles/style.css'
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, cryptoName, theme) {
    return {
      fontWeight:
        cryptoName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

const names = [
    'ADA',
    'BAND',
    'BTC',
    'BCH',
    'DASH',
    'EOS',
    'ETC',
    'ETH',
    'LINK',
    'LTC',
    'NEO',
    'ONT',
    'TRX',
    'USDT',
    'XMR',
    'XRP',
    'XTZ'
];
  
const ModalOptions = () => {   
    const [buttonColor, setButtonColor] = useState('primary');
    const [switcher, setSwitcher] = React.useState(false);
    const [add, setAdd] = useState(false);
    const [deleting, setDelete] = useState(false);
    const [textDelete, setTextDelete] = useState("Delete")
    const [adding, setAdding] = useState(false);
    const {currentCrypto, setCryto} = useContext(CryptoContext)

    const classes = useStyles();
    const theme = useTheme();
    const [cryptoName, setCryptoName] = React.useState([]);

    const handleChange = (event) => {
        setCryptoName(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
            value.push(options[i].value);
        }
        }
        setCryptoName(value);
    };

    const changeDelete = () => {
        if(textDelete === "Delete") {
            setTextDelete("Deactivate")
            setDelete(true)
        } else {
            setTextDelete("Delete")
            setDelete(false)
        }
    }

    const display = () => {
        if(deleting) {
            return 'x'
        }
        else 
        {
        return ''
    }
    }
    
    const deleteItem = (name) => {
        if(deleting) {
            setCryto(currentCrypto.filter(crypto => crypto !== name))
        }
    }
    const addCrypto = (name) => {
        if(!currentCrypto.includes(cryptoName) 
            && !(cryptoName == '') 
            && currentCrypto.length <= 5) {
                setDelete(false)
                setAdd(true)
                console.log(currentCrypto)
                setTextDelete("Delete")
                setCryto(prevState => [...prevState, cryptoName])
        } 
    }

    return (
        <div>
            <div style={{display: "flex"}}>
                {currentCrypto.map((cryp) => <div key={uuidv4()}> <Button key={uuidv4()} value={cryp} onClick={() =>deleteItem(cryp)} style={{borderRadius: "40px", marginLeft: "10px"}} variant="contained" color={deleting ? ('secondary') : ('primary')}> {`${cryp} ` + display()} </Button> </div>)}
            </div>
            <Divider style={{marginTop: '20px'}}/>
            <div style={{margin: '20px', display: "flex"}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        value={cryptoName}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, cryptoName, theme)}>
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Button onClick={addCrypto} style={{background: "rgb(94,203,93)", marginLeft: '20px', borderRadius: "50px"}} variant="contained" color="primary">ADD</Button> 
                <Button onClick={changeDelete} style={{marginLeft: '20px', borderRadius: "50px"}} variant="contained" color="Secondary">{textDelete}</Button>
            </div>
            
        </div>
    )
    
}

export default ModalOptions