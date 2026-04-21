import React, { createContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from '../reducer/AppReducer';
import { getToken, getData } from '../api/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        // Step 1: Get token using credentials
        const token = await getToken();
        
        // Step 2: Fetch data using token
        const orders = await getData(token);

        // Step 3: Store in global state
        dispatch({ type: 'SET_ORDERS', payload: orders || [] });

        // Expose window.appState for testing
        window.appState = {
          orders: orders || [],
        };
      } catch (error) {
        console.error('Failed to load data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
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
