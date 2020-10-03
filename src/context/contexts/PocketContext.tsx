import React, { createContext, useReducer, useEffect} from 'react';
import {IPocket} from '../../shared/interfaces/IPocket';
import {config} from '../../config/config';
import {Currencies} from '../../shared/constants/Currencies';
import {pocketReducer} from '../reducers/PocketReducer';

const initialPockets: IPocket[] = Object.keys(config.currencyList).map(currency => ({
    id: currency,
    balance: currency === Currencies.EUR ? 34569.34 : 0,
    currency: config.currencyList[currency],
    operations: []
  }));

export const PocketContext = createContext<IPocket[]>( initialPockets );

const PocketContextProvider = (props: any) => {
  const [pockets, dispatch] = useReducer(pocketReducer, {}, () => {
    const localData = localStorage.getItem('pockets');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('pockets', JSON.stringify(pockets));
  }, [pockets]);

  return (
    <PocketContext.Provider value={pockets}>
      {props.children}
    </PocketContext.Provider>
  )
}
