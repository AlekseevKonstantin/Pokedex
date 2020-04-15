import React from 'react'
import { useLocalStore } from 'mobx-react'
import { createRequest } from '../utils/utils'

export const StoreContext = React.createContext();  

export const StoreProvider = ({children}) => {
  const store = useLocalStore(() => {
  
  return {
    pages: {},
    pokemons: {},
    count: 0,
    offset: 0, 
    curList: [],
    page: 1,
    isLoad: false,
    isDescLoad: false,
    typeList: [],
    isTypeListLoad: false,
    filterName: '',
    filterTypes: [],
    pageCount: 20,
    selectedPokemon: '',

    /* setters */
    reset () {
      store.pages = {}
      store.count = 0
      store.offset = 0 
      store.curList = []
      store.page = 1
      store.isLoad = false
      store.isDescLoad = false

    }, 

    setSelectedPokemon (name) {
      store.selectedPokemon = name 
    },

    setPageCount (count) {
      store.pageCount = count
    },

    setFilterName (value) {
      store.filterName = value
    },

    setFilterTypes (value) {
      store.filterTypes = value
    },

    setIsTypeListLoad (value) {
      store.isTypeListLoad = value
    },

    setTypeList (list) {
      const types = list.results,
            array = []  
      for (let i = 0, len = types.length; i < len; i+=1) {
        array.push(types[i].name)
      }

      store.typeList = array.sort((a, b) => a > b ? 1 : -1)
    },

    setCurList (item) {
      store.curList.push(item)
    },

    clearCurList () {
      store.curList = []
    },

    setIsDescLoad (value) {
      store.isDescLoad = value
    },

    setIsLoad (value) {
      store.isLoad = value
    },

    setPage (page) {
      store.page = page 
    },

    setCount (count) {
      store.count = count
    },

    setOffset (offset) {
      store.offset = offset
    },

    setPokemon (pokemon) {
      store.pokemons[pokemon.name] = pokemon
    },

    setPageData (data, id) {
      store.pages[id] = data;
    },

    /* async actions */

    fetchPokemonsList (offset, count, id) {
      
      store.setIsLoad(false)
      store.setIsDescLoad(false)
      store.setOffset( offset )
      store.setPage(id)

      const pageData = store.pages[id]

      if (store.count > 0 && pageData) {
        store.getPokemonDesk(id)
      }else{
        createRequest().fetchList(offset, count)
        .then(function(r) {
          if (r.status === 200) {
            store.setPageData(r.data, id)
            if (store.count === 0) {
              store.setCount(r.data.count)
            }
            store.setIsLoad(true)
            store.getPokemonDesk(id)
          }
        })
      }
    },

    getPokemonDesk (id) {
      const pokemons = store.pages[id].results;
      store.clearCurList();

      for(let i = 0, len = pokemons.length; i < len; i += 1) {
        if (store.pokemons[pokemons[i].name]) {
          setTimeout(() => {store.setCurList(store.pokemons[pokemons[i].name])}, 100) 
        }else{
          store.fetchPokemonsDesc(pokemons[i].name)
        }
      }
    },

    fetchPokemonsDesc (name) {

      setTimeout(() => {
        createRequest().fetchDesc (name)
        .then(function(r) {
          if (r.status === 200) {
            store.setPokemon(r.data)
            setTimeout(() => {store.setCurList(r.data)}, 100)
            
          }else{
            console.log(r.msg)
            let name = r.config.url.replace('/pokemon/', '')
            store.fetchPokemonsDesc(name)
          }
        })
      }, 50)
    },

    initTypeList () {
      store.setIsTypeListLoad(false)
      createRequest().fetchTypeList()
        .then(function(r) {
          if (r.status === 200) {
            store.setTypeList(r.data)
          }else{
            console.log(r.msg)
          }

          store.setIsTypeListLoad(true)
        })
    },

    /* getters */

    getPokemonInfo (name) {

      const pokemon = store.pokemons[name]

      return {
        id: pokemon.id,
        name: pokemon.name,
        mainImg: pokemon.sprites.front_default,
        types: pokemon.types.map(item => item.type.name).join(', ')
      }
    },

    getPokemonDesc (name) {

      const pokemon = store.pokemons[name]

      return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        images: [pokemon.sprites.front_default, pokemon.sprites.front_shiny, pokemon.sprites.back_shiny, pokemon.sprites.back_default],
        types: pokemon.types.map(item => item.type.name).join(', ')
      }
    },

    filterByName (list) {
      return list.filter((item) => {
        return !item.name.search(store.filterName)
      })
    },

    filterByType (list) {
      let filter = store.filterTypes.sort().join(', ')
      return list.filter((item) => {
        const source = item.types.map(item => item.type.name).sort().join(', ')
        return source.search(filter) > -1
      })
    },

    /* computed */
    get pokemonList () {
      if (store.filterName.length > 0 && store.filterTypes.length > 0){
        return store.filterByType(store.filterByName(store.curList))
      }else if (store.filterName.length > 0) {
        return store.filterByName(store.curList)
      }else if(store.filterTypes.length > 0){
        return store.filterByType(store.curList)
      }

      return store.curList
    },
    
    get isDescLoaded () {
      if (store.pages[store.page]) {
        if (store.curList.length === store.pages[store.page].results.length) {
          return true
        }
      } 
      return false
    }
    
  }})
  
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

