import React from 'react'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 15px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  cardImg: {
    width: '90px',
    height: '90px'
  },
  title: {
    display: 'block',
    fontWeight: '600',
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
    marginBottom: '3px'
  },
  types: {
    display: 'block',
    fontWeight: '300',
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginBottom: '2px'
  }
}))

const Pokemon = (props) => {
  
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={props.onDialog}>
      <CardMedia image={`${props.desc.mainImg}`} className={classes.cardImg} />
      <span className={classes.title}>{props.desc.name}</span>
      <span className={classes.types}>{props.desc.types}</span>
    </Card>
  )
}

export default Pokemon