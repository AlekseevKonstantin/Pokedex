import React, {useState, useEffect} from 'react'
import { StoreContext } from './../store'
import { useObserver } from 'mobx-react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({

  filter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 30px 30px 30px',

    [theme.breakpoints.down('sm')]: {
      padding: '0 15px 30px 15px',
    },
  },

  counterBtn: {
    color: '#bdbdbd',
    borderColor: '#bdbdbd !important',
    transition: 'border-color .3s'
  },

  active: {
    borderBottom: '1px solid #bdbdbd'    
  },

  formControl: {
    minWidth: 120,
    maxWidth: 300,
    margin: '0 40px'
  }
}))

export default function Filter () {

  const store = React.useContext(StoreContext);

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

  const btns = [
    {
      title: 10, 
      isActive: false, 
    },
    {
      title: 20,
      isActive: true
    }, 
    {
      title: 50,
      isActive: false
    }
  ]

  const classes = useStyles()

  useEffect(() => {
    store.initTypeList()
  }, [])

  const [btn] = useState(() => {
    return activeBtn(store.pageCount)
  })

  function activeBtn(value) {
    return btns.map((item) => {
      item.isActive = item.title !== parseInt(value) ? false : true
      return item
    })
  }

  function handleChange (e) {
    store.setFilterTypes(e.target.value);
  }

  function counterBtnClickHandler (e) {
    e.preventDefault()
    let value = e.target.innerText;
    store.setPageCount(value)
  }

  const btnsToMap = () => {
    return btn.map(item => {
      return <Button className={classes.counterBtn} 
                     classes={item.isActive ? {label: classes.active} : null} 
                     key={item.title} 
                     onClick={counterBtnClickHandler}>
                {item.title}
             </Button>
    })
  }

  return useObserver(() => (
    <div className={classes.filter}>

      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">Types</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={store.filterTypes}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>

          {store.isTypeListLoad && store.typeList.map((title, index) => (
            <MenuItem key={index} value={title}>
              <Checkbox checked={store.filterTypes.indexOf(title) > -1} />
              <ListItemText primary={title} />
            </MenuItem>
          ))} 
        </Select>
      </FormControl>

      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        {btn.length > 0 && btnsToMap ()}
      </ButtonGroup>
    </div>
  ))
}

