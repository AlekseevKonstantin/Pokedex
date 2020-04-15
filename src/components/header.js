import React from 'react'
import { StoreContext } from './../store'
import { useObserver } from 'mobx-react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({

  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 30px',
    backgroundColor: '#dc004e',

    [theme.breakpoints.down('sm')]: {
      padding: '10px 15px',
    },
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: '700',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }

  },

  textfield: {
    color: '#fff',
    margin: '8px 0px 8px 20px',

    '& input': {
      color: '#fff !important',
    },

    '& label': {
      color: '#fff !important',
    },

    '& fieldset': {
      borderColor: '#fff !important'
    }
  }
}));

export default function Header () {

  const classes = useStyles()

  const store = React.useContext(StoreContext);

  function enterSearchHandler (e) {
    store.setFilterName(e.target.value)
  }

  return useObserver (() => (
    <header className={classes.header}>
      <span className={classes.logo}>Pokedex</span>
      <div className="d-flex align-center">
        <TextField
          label="filter by name"
          classes={{root: classes.textfield}}
          type="text"
          margin="normal"
          variant="outlined"
          size="small"
          onChange={enterSearchHandler}
          value={store.filterName}
        />
      </div>
    </header>
  )) 
}