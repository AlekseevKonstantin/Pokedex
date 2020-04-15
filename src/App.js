import React, { useEffect }  from 'react';
import { useObserver } from 'mobx-react'
import { StoreContext } from './store'
import { makeStyles } from '@material-ui/core/styles';

import Pagination from '@material-ui/lab/Pagination';

import Header from './components/header'
import Filter from './components/filter'
import PokemonList from './components/pokemonList'
import Preloader from './components/preloader'
import PokemonDialog from './components/dialog'

const useStyles = makeStyles((theme) => ({
  app: {
    position: 'relative',
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  content: {
    position: 'relative',
    width: '100%',
    maxWidth: '1300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    padding: '30px 0'
  },
  pagination: {
    marginTop: 'auto'
  },
}));

function App() {

  const classes = useStyles();

  const store = React.useContext(StoreContext);

  useEffect(()=>{
    store.reset()
    store.fetchPokemonsList(store.pageCount, store.pageCount, 1)
  }, [store.pageCount])

  function pageChangeHandler (e, page) {
    store.fetchPokemonsList(page*store.pageCount, store.pageCount, page)
  }

  function dialogCloseHandler () {
    store.setSelectedPokemon('')
  }

  return useObserver(() => (
    <div className={classes.app}>
      { 
        store.selectedPokemon.length > 0 && 
        <PokemonDialog pokemon={store.getPokemonDesc(store.selectedPokemon)} 
                       open={store.selectedPokemon.length > 0}
                       onClose={dialogCloseHandler}/>
      }

      <Header />

      {store.isDescLoaded ?
        <main className={classes.content}>
          <Filter />
          <PokemonList /> 
          <Pagination className={classes.pagination} 
                      count={Math.round(store.count / store.pageCount)} 
                      shape="rounded" 
                      page={store.page}
                      onChange={pageChangeHandler}/>
        </main> :
        <Preloader />
      } 
    </div>
  )) 
}

export default App;
