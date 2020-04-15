import React from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../store'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import Pokemon from './pokemon'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 30px 30px 30px',

    [theme.breakpoints.down('sm')]: {
      padding: '0 15px 30px 15px',
    },
  },
}))

const PokemonList = () => {
  const store = React.useContext(StoreContext)

  const classes = useStyles();

  function onDialogHandler (name) {
    store.setSelectedPokemon(name)
  }

  const pokemonToProps = () => {
    return store.pokemonList.map((item, index) => {
      const pokemonDesc = store.getPokemonInfo(item.name)
      return (
        <Grid item xs={12} sm={6} md={3} key={index}> 
          <Pokemon desc={pokemonDesc} onDialog={() => onDialogHandler(pokemonDesc.name)}/> 
        </Grid>
      )
    })
  }
  
  return useObserver(() =>   ( 
    <Grid container spacing={3} className={classes.container}>
      {store.isDescLoaded && pokemonToProps()}
    </Grid>
  ))
  
}

export default PokemonList