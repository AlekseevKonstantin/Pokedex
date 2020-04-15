import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'relatiove',
    padding: '20px',
    minWidth: '300px'
  },
  imgBlock: {
    width: '70px',
    marginRight: '30px',

    '& img': {
      display: 'block',
      width: '70px',
      height: '70px',
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: '4px',
      marginBottom: '4px',

      '&:last-child': {
        marginBottom: '0'
      }
    }
  },
  info: {
    flexGrow: '1'
  },
  text: {
    display: 'flex',
    fontWeight: '400',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  textValue: {
    display: 'block',
    fontWeight: '500',
    fontSize: '1rem',
    color: theme.palette.text.primary,
    marginLeft: '6px'
  },
  closeBtn: {
    position: 'absolute',
    zIndex: '300',
    top: '12px',
    right: '12px'
  },
  dialogTitle: {
    paddingTop: '0'
  }
}))

export default function PokemonDialog (props) {
  
  const classes = useStyles();

  const {onClose, pokemon, open } = props;

  function handleExpandClick () {
    onClose()
  }

  function handleClose () {
    onClose()
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" 
            open={open} 
            classes={{paper: classes.dialog}}
            onClose={handleClose}>

      <IconButton
        onClick={handleExpandClick}
        aria-label="close"
        size="small"
        classes={{root: classes.closeBtn}}>
          <CloseIcon />
      </IconButton>  
      <DialogTitle id="simple-dialog-title" classes={{root: classes.dialogTitle}}>Detailed description</DialogTitle>

      <div className="d-flex w100p">
        <div className={classes.imgBlock}>
          {pokemon.images.map((item, index) => <img src={item} alt={item} key={index} />)}
        </div>

        <div className={classes.info}>
          <span className={classes.text}>name: <span className={classes.textValue}>{pokemon.name}</span></span>
          <span className={classes.text}>height: <span className={classes.textValue}>{pokemon.height}</span></span>
          <span className={classes.text}>weight: <span className={classes.textValue}>{pokemon.weight}</span></span>
          <span className={classes.text}>types: <span className={classes.textValue}>{pokemon.types}</span></span>
        </div>
      </div>
    </Dialog>
  )
}