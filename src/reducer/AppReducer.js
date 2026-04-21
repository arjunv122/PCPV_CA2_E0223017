export const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };

    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order?.orderId === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };

    default:
      return state;
  }
};
