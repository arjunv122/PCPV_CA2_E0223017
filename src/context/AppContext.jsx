import React, { createContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from '../reducer/AppReducer';
import { getToken, getDataset, cleanOrder, isValidOrder } from '../api/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🚀 Starting data load process...')
        dispatch({ type: 'SET_LOADING' });
        

        const tokenRes = await getToken(
          'E0223017',  
          '351727',    
          'setA'     
        );

      
        const ordersData = await getDataset(tokenRes.token, tokenRes.dataUrl);
        const rawOrders = Array.isArray(ordersData) ? ordersData : [];
        const validOrders = rawOrders
          .map((item, index) => cleanOrder(item, index))
          .filter(isValidOrder);

        dispatch({ type: 'SET_ORDERS', payload: validOrders });

      
        window.appState = {
          orders: validOrders,
          count: validOrders.length,
          token: tokenRes.token?.substring(0, 20) + '...',
        };
        
        console.log(`🎉 Data load complete! ${validOrders.length}/${rawOrders.length} orders valid`)
      } catch (error) {
        console.error('💥 Failed to load data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to fetch data' });
        
       
        window.appState = {
          orders: [],
          count: 0,
          error: error.message,
        };
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
